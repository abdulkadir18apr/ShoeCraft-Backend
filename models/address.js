const mongoose =require('mongoose');

const {Schema}=mongoose;

const AddressSchema=new Schema({
    name:String,
    contact:String,
    city:String,
    pincode:String,
    state:String,
    alternatePh:String,
    address:String,
    edit:{type:Boolean,default:false},
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
  
})
module.exports=mongoose.model('address',AddressSchema);

