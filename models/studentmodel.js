const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    classId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Student', StudentSchema);
