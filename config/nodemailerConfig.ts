module.exports = {
    service: 'gmail',
    host: 'mail.openjavascript.info',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false // Accept self-signed certificates
    }
  };
  