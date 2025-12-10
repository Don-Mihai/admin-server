const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// установка схемы
const productScheme = new Schema({
  image: String,
  price: Number,
  sold: Number,
  stock: Number,
  title: String,
});

const Product = mongoose.model('Product', productScheme);

module.exports = Product;
