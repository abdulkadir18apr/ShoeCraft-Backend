const mongoose =require('mongoose');
const Products=require("./products");

const {Schema}=mongoose;

const cartSchema=new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    products:[
        {
            product:{type:mongoose.Types.ObjectId,ref:'Product'},
            quantity:{type:Number,default:1}
        }
    ]
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;