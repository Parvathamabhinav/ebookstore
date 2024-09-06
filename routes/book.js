const router = require("express").Router();
const User=require("../models/user")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Book=require("../models/book")
const {authenticateToken}=require("./userAuth")


//add book --admin
router.post("/add-book",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const user=await User.findById(id);
        if(user.role!=="admin"){
            return res.status(400).json({message:"You are not having access to perform admin work"});
        }
        const book= new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        })
        await book.save();
        res.status(200).json({message:"Book added succesfully"});
    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})

//update book
router.put("/update-book",authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.headers;
        await Book.findByIdAndUpdate(bookid,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        });
        
        return res.status(200).json({message:"Book updated succesfully"});
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})

module.exports=router;