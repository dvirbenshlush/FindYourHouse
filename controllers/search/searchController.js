const axios = require('axios');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const s3Service = require('../../services/s3Service');

const flatten = (data) => {
    let result = [];
    data.forEach((item) => {
        const flatItem = flattenObject(item);
        result.push(flatItem);
    });
    return result;
};

const flattenObject = (obj, parent = '', res = {}) => {
    for (let key in obj) {
        let propName = parent ? parent + '.' + key : key;
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            flattenObject(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }
    return res;
};

exports.search = async (req, res) => {
    const url = "https://gw.yad2.co.il/feed-search-legacy/realestate/forsale";
    const params = {
        city: 8300,
        rooms: '2-4',
        price: '800000-1400000',
        forceLdLoad: false
    };

    try {
        const response = await axios.get(url, { params });

        let data = response.data.data.yad1Listing;
        
        // Ensure data is an array
        if (!Array.isArray(data)) {
            if (data && typeof data === 'object') {
                // If the response is an object, extract the array if it exists
                data = data.feed || data.items || [];
            } else {
                throw new Error('Unexpected response format');
            }
        }
        const flattenedData = flatten(data);

        const workbook = XLSX.utils.book_new();
        const date = new Date();
        const formattedDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
        const fileName = `דירות_${formattedDate}.xlsx`;
        const worksheetName = `דירות_${formattedDate}`;
        
        const worksheet = XLSX.utils.json_to_sheet(flattenedData);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
        
        const filePath = path.join(__dirname, `../${fileName}`);
        XLSX.writeFile(workbook, filePath);
        const s3FilePath = await s3Service.uploadFileToS3(filePath, fileName);

        res.json({ message: data });

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
};
