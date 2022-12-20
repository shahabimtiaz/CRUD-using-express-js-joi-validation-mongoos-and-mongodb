var mongoose = require('mongoose');

// making schema using mongoose
var studentSchema = new mongoose.Schema({
    id: Number,
    name: String,
    class: String,
    age: Number
});
var Student  = mongoose.model('student',studentSchema);
module.exports = Student;