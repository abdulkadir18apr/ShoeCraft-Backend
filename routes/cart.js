const Cart=require("../models/cart");
const express=require("express");
const router=express.Router();

const requireAuth=require("../Utils/authUtils");

//Routes to Add Product to the cart
router.post("/cart/:id",requireAuth,async(req,res)=>{
    const productId=req.params.id
    try{
        let cart=await Cart.findOne({user:req.user.id});
 

        if(!cart){
            cart= new Cart({
                user:req.user.id,
                products:[{product:productId,quantity:1}]
            })
            await cart.save();
        }
        else{
            //chect if product already Exists
    
            const existProduct=cart.products.find((item)=>item.product.toString()===productId);
            if(existProduct){
                existProduct.quantity+=1;
                await cart.save();
            }
            else{
                cart.products.push({product:productId});
                await cart.save();
            }
        }
        return res.json({success:true,cart})
    }
    catch(err){
        return res.status(400).json({success:false,errors:err.message});
    }
})

//Route to add products in the cart

router.get("/cart",requireAuth,async(req,res)=>{
    try{
        const cart=await Cart.findOne({user:req.user.id});
        if(!cart){
            return res.status(400).json({success:false,error:"No user Found"});
        }
        return res.json({success:true,cart});

    }
    catch(err){
        return res.status(400).json({success:false,errors:err.message});

    }
})


router.delete('/cart/:id',requireAuth,async(req,res)=>{
    const productId=req.params.id;
    try{
        const cart=await Cart.findOne({user:req.user.id});
        if(!cart){
            return res.status(400).json({success:false,error:"No user Found"});
        }
        const result= await Cart.updateOne({user:req.user.id},{$pull:{products:{product:productId}}});
        if(!result){
            return res.status(400).json({success:false,error:"No Product Found"});

        }
        return res.json({success:true,msg:"Product deleted succesfully"});
    }
    catch(err){
        return res.status(400).json({success:false,errors:err.message});
    }
})



// Route to increment or decrement quantity
router.put('/cart/:productId/:action', requireAuth,async (req, res) => {
  const { productId, action } = req.params;
  const increment = action === 'increment' ? 1 : -1;

  try {
    const cart = await Cart.findOne({user:req.user.id});
    const product = cart.products.find(p => p.product.toString() === productId);
    if(increment===-1 && product.quantity<=0){
        return res.json({success:false,message:"Cannot decremnet less than 0"})
    }
    const updatedCart = await Cart.findOneAndUpdate(
      {user:req.user.id},
      { $inc: { 'products.$[elem].quantity': increment } },
      { arrayFilters: [{ 'elem.product': productId }] }
    );

    if (!updatedCart) {
      return res.status(404).json({ success:true , message: 'Cart not found' });
    }

    return res.json({ success:true, message: 'Quantity updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success:false, message: 'Internal Server Error' });
  }
});

module.exports = router;
