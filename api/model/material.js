const mongoose = require('mongoose');

const materialSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    unit: { type: String, required: true },
    inventory: { type: Number, required: true }
});

module.exports = mongoose.model('Material', materialSchema);