const assignmentService = require('../services/assignmmentService');

exports.handleSocketConnection = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('join-class', async (classId) => {
            socket.join(classId);
            console.log(`Student with socket ID ${socket.id} joined class ${classId}`);

         
            const missedAssignments = await assignmentService.getMissedAssignments(classId);
            socket.emit('missed-assignments', missedAssignments);
        });

        socket.on('create-assignment', async (data) => {
            try {
                const savedAssignment = await assignmentService.createAssignment(data);
                io.to(data.classId).emit('new-assignment', savedAssignment);
            } catch (error) {
                console.error('Error creating assignment:', error);
            }
        });

        socket.on('submit-assignment', async (data) => {
            try {
                const savedSubmission = await assignmentService.submitAssignment(data);

                // Notify the teacher of the submission
                const assignment = await Assignment.findById(data.assignmentId);
                io.to(assignment.teacherId).emit('assignment-submitted', savedSubmission);
            } catch (error) {
                console.error('Error submitting assignment:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
