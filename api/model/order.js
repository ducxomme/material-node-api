const mongoose = require('mongoose');

const detail_orderSchema = mongoose.Schema({
    material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    materials: [detail_orderSchema]
});

module.exports = mongoose.model('Order', orderSchema);