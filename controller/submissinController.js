const assignmentService = require('../services/assignmmentService');

exports.createAssignment = async (req, res) => {
    try {
        const savedAssignment = await assignmentService.createAssignment(req.body);
        res.status(201).json(savedAssignment);
    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).json({ error: 'Failed to create assignment' });
    }
};
