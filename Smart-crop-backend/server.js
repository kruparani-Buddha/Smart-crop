const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Order = require('./models/Order');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
const Razorpay = require('razorpay');
const razorpayInstance = new Razorpay({
  key_id: 'rzp_test_TrldfZZ2ZgqoCG',
  key_secret: 'wX3mJVAdQH0UB7OlNRwq8hgu'
});

// Connect to Local MongoDB
mongoose.connect('mongodb://localhost:27017/smart_crop_store')
  .then(() => console.log('✅ Connected to MongoDB Database'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// --- Register API ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { mobile, password } = req.body;
    if (!mobile || mobile.length !== 10) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number.' });
    }
    
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ error: 'User already registered with this mobile number.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ mobile, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Account registered successfully in Database!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// --- Login API ---
app.post('/api/auth/login', async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ error: 'User not found. Please register first.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password.' });
    }

    res.status(200).json({ message: 'Successfully logged in!', mobile: user.mobile });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login.' });
  }
});
// Create Razorpay Order Route
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };
    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

// --- Checkout / Order API ---
app.post('/api/orders/checkout', async (req, res) => {
  try {
    const { mobile, items, totalAmount, paymentMethod } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty.' });
    }

    const newOrder = new Order({
      mobile: mobile || 'Guest User',
      items,
      totalAmount,
      paymentMethod,
      status: paymentMethod === 'razorpay' ? 'Paid via Razorpay' : 'Pending (COD)'
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: 'Order successfully saved to database!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error processing checkout.' });
  }
});
app.get('/', (req, res) => {
  res.send('Smart Crop Backend is running successfully!');
});

app.listen(PORT, () => console.log(`🚀 Backend Server running on port ${PORT}`));