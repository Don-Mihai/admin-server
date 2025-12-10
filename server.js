const express = require('express');
const cors = require('cors');
const connect = require('./mongoConnect');
const Product = require('./models/ProductsModel');

const app = express();

app.use(cors());
app.use(express.json());

connect();

app.get('/products', async (req, res) => {
  const products = await Product.find();

  res.status(200).send(products);
});

app.post('/products', async (req, res) => {
  const product = req.body;

  const newProduct = new Product(product);
  const savedProduct = await newProduct.save();

  res.status(201).send(savedProduct);
});

app.listen(5005, () => {
  console.log('Server is running on port 5005');
});
