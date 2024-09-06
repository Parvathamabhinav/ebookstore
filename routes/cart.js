const router = require("express").Router();
const User=require("../models/user")
const {authenticateToken}=require("./userAuth")

//put book to cart
router.put("/add-to-cart",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}=req.headers;
        const userData=await User.findById(id);
        const isBookFavourited=userData.cart.includes(bookid);
        if(isBookFavourited){
            return res.json({
                status:"Success",
                message:"Book is already in cart "
            });
        }
            await User.findByIdAndUpdate(id,{$push:{cart:bookid}});
            return res.json({
                status:"Success",
                message:"Book added to cart",           
             });
        
    }catch(error){
        console.log(error);
        return res.json({message:"Internal error"})
    }
})

//remove from cart
router.put("/remove-from-cart/:bookid",authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.params;
        const {id}=req.headers;
        await User.findByIdAndUpdate(id,{
            $pull:{cart:bookid},
        });
        return res.json({
            status:"Success",
            message:"Book removed from cart"
        })    
    }catch(error){
        return res.json({message:"Internal error"})
    }
})





module.exports=router;