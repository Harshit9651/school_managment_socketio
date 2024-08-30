const Assignment = require('../models/assignmentmodel');
const Submission = require('../models/submissionassignment');

exports.createAssignment = async ({ title, description, classId, teacherId }) => {
    const assignment = new Assignment({ title, description, classId, teacherId });
    return await assignment.save();
};

exports.submitAssignment = async ({ assignmentId, studentId, submissionFile }) => {
    const submission = new Submission({ assignmentId, studentId, submissionFile });
    return await submission.save();
};

exports.getMissedAssignments = async (classId, limit = 10) => {
    return await Assignment.find({ classId }).sort({ createdAt: -1 }).limit(limit);
};
