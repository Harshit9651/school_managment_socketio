const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Routerroute = require('./routes/routes');
const server = http.createServer(app);
const io = socketIo(server);

require('./server/connection');

const Assignment = require("./models/assignmentmodel");
const Submission = require("./models/submissionassignment");

app.use(express.json());

const session = require('express-session');

app.use(session({
    secret: 'hello', // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join the student to their class room
    socket.on('join-class', async (classId) => {
        socket.join(classId);
        console.log(`Student with socket ID ${socket.id} joined class ${classId}`);

        // Send any missed assignments to the student
        const missedAssignments = await Assignment.find({ classId }).sort({ createdAt: -1 }).limit(10);
        socket.emit('missed-assignments', missedAssignments);
    });

    // Teacher creates an assignment
    socket.on('create-assignment', async (data) => {
        const { title, description, classId, teacherId } = data;

        try {
            const assignment = new Assignment({ title, description, classId, teacherId });
            const savedAssignment = await assignment.save();

            // Emit the assignment to all students in the class
            console.log(`Emitting new assignment to class ${classId}:`, savedAssignment);
            io.to(classId).emit('new-assignment', savedAssignment);
        } catch (error) {
            console.error('Error creating assignment:', error);
        }
    });

    // Student submits an assignment
    socket.on('submit-assignment', async (data) => {
        const { assignmentId, studentId, submissionFile } = data;

        try {
            const submission = new Submission({ assignmentId, studentId, submissionFile });
            const savedSubmission = await submission.save();

            // Notify the teacher of the submission
            const assignment = await Assignment.findById(assignmentId);
            io.to(assignment.teacherId).emit('assignment-submitted', savedSubmission);
        } catch (error) {
            console.error('Error submitting assignment:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

app.use('/', Routerroute);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.render('student.ejs');
});

app.get('/te', (req, res) => {
    res.render("teacher.ejs");
});
