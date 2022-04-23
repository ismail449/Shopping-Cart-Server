require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const product = require('./models/productModel');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());


mongoose
  .connect(process.env.MONGO_URI||'mongodb://localhost/react-shopping-cart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connection is good');
  });

const order = mongoose.model(
  'order',
  new mongoose.Schema(
    {
      name: String,
      email: String,
      total: Number,
      cart: [{ quantity: Number, title: String }],
    },
    {
      timestamps: true,
    },
  ),
);


app.get('/api/orders', async (req, res) => {
  const orders = await order.find();
  res.send(orders);
});

app.post('/api/orders', async (req, res) => {
  const newOrder = new order(req.body);
  const savedOrder = await newOrder.save();
  res.send(savedOrder);
});

app.delete('/api/orders/:id', async (req, res) => {
  const deletedOrder = await order.findByIdAndDelete(req.params.id);
  res.send(deletedOrder);
});

app.get('/api/products', async (req, res) => {
  const products = await product.find();
  res.send(products);
});

app.post('/api/products', async (req, res) => {
  const newProduct = new product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete('/api/products/:id', async (req, res) => {
  const deletedProduct = await product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});
app.listen(port, () => console.log(`listening on port ${port}!`));
