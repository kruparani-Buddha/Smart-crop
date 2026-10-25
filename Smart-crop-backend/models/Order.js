const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  mobile: { type: String, required: true },
  items: [{ id: String, qty: Number, price: Number }],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);