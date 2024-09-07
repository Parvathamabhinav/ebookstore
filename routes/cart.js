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
//put instead of delete is used bcoz we r not removing book from database.
router.put("/remove-from-cart/:bookid",authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.params;
        const {id}=req.headers;
        //$pull is used to remove elements from array
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

//get cart of a particular user
router.get("/get-user-cart",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        // console.log("1");
        const userData=await User.findById(id).populate("cart");//remove populate and see

        const cart=userData.cart.reverse();//why reverse()
       
        return res.json({
            status:"Success",
            data:cart,
        });
    }catch(error){
        console.log(error)
        res.json({message:"Internal server problem"})
    }
})





module.exports=router;