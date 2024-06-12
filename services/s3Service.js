const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// הגדרת הגישה ל-S3
const awsConfig = require('../config/aws-config');
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

module.exports = { uploadFileToS3 };

// דוגמה לשימוש בפונקציה
// const fileName = 'example.xlsx'; // שם הקובץ ב-S3
// const filePath = path.join(__dirname, 'files', fileName); // נתיב לקובץ המקומי
// uploadFileToS3(filePath, fileName);
