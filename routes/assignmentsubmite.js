const express = require('express');
const router = express.Router();
const submissionController = require('../controller/submissinController');

router.post('/submitAssignment', submissionController.submitAssignment);

module.exports = router;
