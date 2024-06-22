const express = require('express');
const router = express.Router();
const downloadReports = require('../controllers/downloadReports/downloadReportsController');

router.get('/', downloadReports.downloadReports);

module.exports = router;
