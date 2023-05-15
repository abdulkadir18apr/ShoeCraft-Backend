const Category=require("../models/category");
const express=require("express");
const router=express.Router();

router.post("/addCategory",async(req,res)=>{
    try{
        let category=await Category.findOne({categoryName:req.body.categoryName});
        if(category){
            return res.json({success:false,msg:"Already Exist"});
        }
        category=new Category({
            categoryName:req.body.categoryName,
            description:req.body.description
        })
        await category.save();
        return res.json({success:true,category:category})

    }
    catch(err){
        res.status(400).json({success:false,errors:err.message})
    }

})

router.get("/",async(req,res)=>{
    try{
        let category=await Category.find();

        return res.json({success:true,categories:category})

    }
    catch(err){
        res.status(400).json({success:false,errors:err.message})
    }

})

router.get("/:categoryId",async(req,res)=>{
    try{
        let category=await Category.findOne({_id:req.params.categoryId});

        return res.json({success:true,category})

    }
    catch(err){
        res.status(400).json({success:false,errors:err.message})
    }

})
module.exports=router