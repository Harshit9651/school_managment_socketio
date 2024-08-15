const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    name: String,
    teacherIds: [mongoose.Schema.Types.ObjectId],
    studentIds: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model('Class', ClassSchema);
