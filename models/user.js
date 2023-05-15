const mongoose =require('mongoose');

const {Schema}=mongoose;

const userScema=new Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    createdAt:{type:Date,default:Date.now}
})
module.exports=mongoose.model('user',userScema);


