const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    assignmentId: String,
    studentId: String,
    submissionFile: String,
    submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Submission', SubmissionSchema);
