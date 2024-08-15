const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    name: String,
    teacherIds: String,
    studentIds: String,
});

module.exports = mongoose.model('Class', ClassSchema);
