const Wishlist=require("../models/wishlist");
const express=require("express");
const router=express.Router();

const requireAuth=require("../Utils/authUtils");

router.post("/:productId",requireAuth,async(req,res)=>{
    const {productId}=req.params
    try{
        let wishlist=await Wishlist.findOne({user:req.user.id});
        if(!wishlist){
            const wishlist=new Wishlist({
                user:req.user.id,
                products:[productId]
            })
            await wishlist.save();
            return res.json({success:true,msg:"item Added in wishList"})
        }
        const isExist=wishlist.products.find((id)=>id.toString()===productId);
        if(!isExist){
            wishlist.products.push(productId);
            await wishlist.save()
        }
        else{
            return res.json({success:true,msg:"Already in wislist"})
        }
        
        return res.json({success:true,msg:"item added in a wishlist"})

    }
    catch(err){
        return res.status(400).json({success:false,errors:err.message});

    }
})



router.get("/",requireAuth,async(req,res)=>{
   
    try{
        const wishlist=await Wishlist.findOne({user:req.user.id});
        if(!wishlist){
            return res.status(400).json({success:false,msg:"No wishlist Found"});
        }
        const wishlistProducts=await Wishlist.findOne({user:req.user.id}).populate('products');
        return res.json({success:true,wishlist:wishlistProducts});
    }
    catch(err){
        return res.status(400).json({success:false,errors:err.message});

    }
})

router.delete('/:productId',requireAuth,async(req,res)=>{
    const {productId}=req.params;
    try{
        const wishlist=await Wishlist.findOne({user:req.user.id});
        if(!wishlist){
            return res.status(400).json({success:false,msg:"No wishlist Found"});
        }
        const delProducts=await Wishlist.updateOne({user:req.user.id},{$pull:{products:productId}});
        if(!delProducts){
            return res.status(400).json({success:false,msg:"something went wrong"});
        }
        return res.json({success:true,msg:"product removed from wishlist"});
    }
    catch(err){
        return res.status(400).json({success:false,errors:err.message});

    }

})






module.exports=router;
