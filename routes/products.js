const Products=require("../models/products");
const express=require("express");
const router=express.Router();


router.get("/",async(req,res)=>{
    try{
        const products=await Products.find();
        if(!products){
            return res.json({success:false,errors:"No Products Found"});
        }
        return res.json({success:true,products,toatlProducts:products.length})

    }
    catch(err){
        res.status(400).json({success:false,errors:err.message})
    }
})


router.get("/:id",async(req,res)=>{
    try{
        const product=await Products.findById(req.params.id)
        if(!product){
            return res.json({success:false,errors:"No Product Found"});
        }
        return res.json({success:true,product})

    }
    catch(err){
        res.status(400).json({success:false,errors:err.message})
    }
})

module.exports=router;