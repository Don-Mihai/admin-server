const express = require('express');
const cors = require('cors');
const connect = require('./mongoConnect');
const Product = require('./models/ProductsModel');
const Users = require('./models/UsersModel');
require('./telegram');
require('dotenv').config();
const transporter = require('./email');
const upload = require('./uploadFiles');
const app = express();
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

connect();

// transporter.sendMail({
//   from: '"Maddison Foo Koch" <azhdar-aliev@mail.ru>',
//   to: 'leonardovinci8007@gmail.com',
//   subject: 'Hello ✔',
//   text: 'Hello world?', // Plain-text version of the message
//   html: '<b>Hello world?</b>', // HTML version of the message
// });

app.use('/uploads', express.static('uploads'));

app.post('/upload-avatar', upload.single('file'), async (req, res) => {
  const user = await Users.findByIdAndUpdate(new mongoose.Types.ObjectId('694ac72cabdb0d54c2ebbc77'), { avatarUrl: req.file.path });

  res.status(200).send('file uploaded successfully');
});

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

// пользователи

app.get('/users', async (req, res) => {
  const products = await Users.find();

  res.status(200).send(products);
});

app.post('/users', async (req, res) => {
  const users = req.body;

  const newUsers = new Users(users);
  const savedUsers = await newUsers.save();

  res.status(201).send(savedUsers);
});

app.listen(5005, () => {
  console.log('Server is running on port 5005');
});
