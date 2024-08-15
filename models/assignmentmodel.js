const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    title: String,
    description: String,
    classId: String,
    teacherId:String,
    status: { type: String, default: 'pending' },
    submissionDate: Date,
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
