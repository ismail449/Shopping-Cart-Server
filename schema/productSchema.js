const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  imageUrl: String,
  description: String,
  price: Number,
  size: [String],
});

module.exports = productSchema;
