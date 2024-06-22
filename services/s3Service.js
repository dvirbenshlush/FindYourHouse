const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// הגדרת הגישה ל-S3
const awsConfig = require('../config/aws-config.ts');
const s3 = new AWS.S3(awsConfig);

// פונקציה להעלאת קובץ ל-S3
const uploadFileToS3 = async (filePath, fileName) => {
  try {
    const fileContent = fs.readFileSync(filePath);

    // הגדרות העלאה
    const params = {
      Bucket: 'baseonfiles',
      Key: fileName,
      Body: fileContent
    };

    // העלאת הקובץ ל-S3
    const data = await s3.upload(params).promise();
    console.log('File uploaded successfully:', data.Location);
    return data.Location;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
};

// פונקציה לקריאת כל הקבצים מ-S3
const getAllFilesFromS3 = async () => {
  try {
    // הגדרות קריאה
    const params = {
      Bucket: 'baseonfiles'
    };
    const fileParams = [];
    const data = await s3.listObjects(params).promise();
    data.Contents.map(async (file) => {
            fileParams.push({
              Bucket: 'baseonfiles',
              Key: file.Key
            });
          });
    const fileData = await s3.getObject(fileParams[2]).promise();
    console.log('File retrieved successfully:', fileParams[2].Key);
    return {dataBody: fileData.Body, fileName: fileParams[2].Key};
  } catch (error) {
    console.error('Error retrieving files from S3:', error);
    throw error;
  }
};

module.exports = { uploadFileToS3, getAllFilesFromS3 };


// דוגמה לשימוש בפונקציה
// const fileName = 'example.xlsx'; // שם הקובץ ב-S3
// const filePath = path.join(__dirname, 'files', fileName); // נתיב לקובץ המקומי
// uploadFileToS3(filePath, fileName);
