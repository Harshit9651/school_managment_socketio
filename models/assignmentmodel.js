const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    title: String,
    description: String,
    classId: mongoose.Schema.Types.ObjectId,
    teacherId: mongoose.Schema.Types.ObjectId,
    status: { type: String, default: 'pending' },
    submissionDate: Date,
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
