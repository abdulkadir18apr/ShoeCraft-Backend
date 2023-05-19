const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  is_in_inventory: {
    type: Boolean,
    required: true,
  },
  items_left: {
    type: Number
  },
  imageURL: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  featured: {
    type: Number
  },
  rating:{
    type:Number,
    default:function(){
        return Math.floor(Math.random() * 5) + 1;
      }
  }

});

const Product = mongoose.model('Product', productSchema,"Products");


module.exports = Product;