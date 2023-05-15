const mongoose =require('mongoose');

const {Schema}=mongoose;

const CategorySchema=new Schema({
    categoryName:String,
    description:String 
})
module.exports=mongoose.model('category',CategorySchema);

