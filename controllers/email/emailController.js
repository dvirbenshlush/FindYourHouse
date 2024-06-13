const nodemailer = require('nodemailer');
const nodemailerConfig = require('../../config/nodemailerConfig.ts');
const fs = require('fs');
const path = require('path');
const config = require('../../config/config.ts');

exports.sendEmail = async (req, res) => {
  try {
    const date = new Date();
    const formattedDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
    const fileName = `דירות_${formattedDate}.xlsx`;
    const filePath = path.join(__dirname, '../', fileName); // עדכן כאן את שם הקובץ ונתיבו

    // בדוק אם הקובץ קיים
    if (!fs.existsSync(filePath)) {
      return res.status(400).send('File path is invalid or file does not exist 1');
    }
    
    if (!filePath || !fs.existsSync(filePath)) {
      return res.status(400).send('File path is invalid or file does not exist');
    }

    let transporter = nodemailer.createTransport(nodemailerConfig);
    let info = await transporter.sendMail({
      from: config.GMAIL_USER,
      to: config.RECEIVER_EMAIL,
      subject: 'Hello Mayol',
      text: 'How u doin? ;)',
      attachments: [
        {
          filename: fileName,
          path: filePath // נתיב הקובץ במערכת הקבצים
        }
      ]
    });

    res.send('Email sent: ' + info.response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
};
