const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const product = require('./models/productModel')

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/react-shopping-cart', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('connection is good')
});



app.get('/api/products', async (req, res) => {
    const products = await product.find()
    res.send(products)
});

app.post('/api/products', async (req, res)=>{
    const newProduct = new product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct)
})

app.delete('/api/products/:id', async (req, res)=>{
    
    const deletedProduct = await product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
})
app.listen(port, () => console.log(`listening on port ${port}!`));
