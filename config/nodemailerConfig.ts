const config = require('../config/config.ts');

module.exports = {
    service: 'gmail',
    host: 'mail.openjavascript.info',
    port: 465,
    secure: true,
    auth: {
      user: config.GMAIL_USER,
      pass: config.GMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false // Accept self-signed certificates
    }
  };
  