// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes');
const OrderRoutes = require('./routes/OrderRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Simple route
app.get('/', (req, res) => {
  res.send('Welcome to MERN Stack');
});

// Use the user routes
app.use('/api/user', UserRoutes);
app.use('/api/order', OrderRoutes);
// app.use('/api/userinfo/:id', UserRoutes);
// app.use('/api/orderdetails/:id', OrderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
