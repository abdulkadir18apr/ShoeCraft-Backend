const requireAuth = require("../Utils/authUtils");
const address = require("../models/address");
const Address=require("../models/address");
const express=require("express");
const router=express.Router();


router.post("/",requireAuth,async(req,res)=>{
    const {name,contact,alternatePh,address,pincode,city,state}=req.body;
    try{
        const newAddreess=await Address.create({
            name,contact,alternatePh,city,state,address,pincode,user:req.user.id
        })
        // (await newAddreess).save();
        return res.json({success:true,address:newAddreess})

    }
    catch(err){
        return res.status(400).json({success:false,error:err.message})
    }
})

router.delete("/:id",requireAuth,async(req,res)=>{
    const {id}=req.params;
    try{
       const addressToDelete=await Address.findById({_id:id});
       if(!addressToDelete){
            return res.status(400).json({success:false,msg:"no address found"})
       }
       if(addressToDelete.user.toString()!==req.user.id){
            return res.status(400).json({success:false,msg:"no user found"})
       }
       const deletedAddress=await Address.findByIdAndDelete({_id:id});
       if(!deletedAddress){
        return res.status(400).json({success:false,msg:"no address found"})
       }
       return res.json({success:true,msg:"Deleted Succesfully"});
    }
    catch(err){
        return res.status(400).json({success:false,error:err.message})
    }
})

router.get("/",requireAuth,async(req,res)=>{
    try{
        const addresses=await Address.find({user:req.user.id});
        if(!addresses){
            return({success:false,msg:"No address Found"})
        }
        return(res.json({success:true,addresses}))

    }
    catch(err){
        return res.status(400).json({success:false,error:err.message})
    }

});

router.put("/:id",requireAuth,async(req,res)=>{
    const {id}=req.params;
    const {name,contact,alternatePh,address,pincode,city,state}=req.body;
    try{
        const add=await Address.findById({_id:id});
        if(!add){
            return res.status(400).json({success:false,msg:"no address Found"});
        }
        if(add.user.toString()!==req.user.id){
            return res.status(400).json({success:false,msg:"no belong to user"});
        }
        const updatedAdd=await Address.findByIdAndUpdate({_id:id},{name,contact,alternatePh,address,pincode,city,state,user:req.user.id});
        if(!updatedAdd){
            return res.status(400).json({success:false,msg:"updation Failed"});
        }
        const newAdd=await Address.findById({_id:id,user:req.user.id});
        return res.json({success:true,address:newAdd});
    }
    catch(err){
        return res.status(400).json({success:false,error:err.message})
    }

})
module.exports=router;