const mongoose =require('mongoose');


const {Schema}=mongoose;

const wishlistSchema=new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    products:[{type:mongoose.Types.ObjectId,ref:'Product'}]
})

const Cart = mongoose.model('Wishlist', wishlistSchema);

module.exports = Cart;