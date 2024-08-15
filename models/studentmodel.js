const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    classId: String,
});

module.exports = mongoose.model('Student', StudentSchema);
