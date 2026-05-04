const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_No: { type: Number, unique: true },
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_marks: Number,
    Total: Number,
    Percentage: Number
});

module.exports = mongoose.model('Student', studentSchema);