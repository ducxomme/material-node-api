const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    gender: { type: Boolean, required: true, default: true}
});

module.exports = mongoose.model('Employee', employeeSchema);