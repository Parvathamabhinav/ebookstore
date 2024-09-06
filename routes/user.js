const router = require("express").Router();
const User=require("../models/user")
//Sign up
router.post("/sign-up",async(req,res)=>{
    try{
        const {username,email,password,address}=req.body;

        if(username.length<4){
            return res.status(400).json({message:"Username length>=4"})
        }
        //check username already exists
        const existingUsername=await User.findOne({username:username})
        if(existingUsername){
            return res.status(400).json({message:"user already exists"})
        }

        //check email
        const existingEmail=await User.findOne({email:email})
        if(existingEmail){
            return res.status(400).json({message:"Email already exists"})
        }
        //check password
        if(password.length<=5){
            return res.status(400).json({message:"password length >5"})
       
        }

        const newUser= new User({
            username:username,
            email:email,
            password:password,
            address:address,
        });
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})





module.exports=router;