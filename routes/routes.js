const express = require("express");
const Class = require("../models/classmodel");
const Student = require("../models/studentmodel");
const Teacher = require("../models/teachermodel")
const router = express.Router();

router.get('/student', (req, res) => {
    res.render('createstudent.ejs');
});

router.get('/class', (req, res) => {
    res.render('createclass.ejs');
});

router.get('/teacher', (req, res) => {
    res.render('createteacher.ejs');
});

// Handle 'Add Student' form submission
router.post('/addstudent', async(req, res) => {
    const { name, email } = req.body;
    console.log(name, email);

    // Ensure classId is retrieved from the session
    const classId = req.session.class_Id;
    if (!classId) {
        return res.status(400).send("Class ID not found in session");
    }

    const student = new Student({ name, email, classId });
    const std = await student.save();

    console.log(std);
    res.redirect('/student');
});

// Handle 'Add Class' form submission
router.post('/addclass', async (req, res) => {
    const { classname } = req.body;
    console.log(classname);

    try {
        // Create and save the new class
        const classs = new Class({ name: classname });
        const savedClass = await classs.save();
        console.log(savedClass);

        // Store the class ID in the session
        req.session.class_Id = savedClass._id;

        // Redirect to another page, maybe the student creation page
        res.redirect('/student');
    } catch (err) {
        console.error("Error saving class:", err);
        res.status(500).send("Internal Server Error");
    }
});
router.post('/teacherdata', async (req, res) => {
    const {name,email } = req.body;
    console.log(name,email);

    try {
        // Create and save the new class
        const taecher = new Teacher({ name:name,email:email });
        const saveteacher = await taecher.save();
        console.log(saveteacher);

        // Store the class ID in the session


        // Redirect to another page, maybe the student creation page
      res.send(200).status('ok')
    } catch (err) {
        console.error("Error saving class:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
