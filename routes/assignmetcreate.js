const express = require('express');
const router = express.Router();
const assignmentController = require('../controller/assignmnetcontroller');

router.post('/createAssignment', assignmentController.createAssignment);

module.exports = router;
