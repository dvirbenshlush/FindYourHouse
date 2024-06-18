const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search/searchController');

// router.post('/', (req, res) => {
//     // Add your parameter here
//     const parameter = req.body.currentPage;
//     searchController.search(parameter);
// });

router.post('/', searchController.search);


module.exports = router;
