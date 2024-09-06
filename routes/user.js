const router = require("express").Router();
const User=require("../models/user")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
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
        const hashPass=await bcrypt.hash(password,10)
        const newUser= new User({
            username:username,
            email:email,
            password:hashPass,
            address:address,
            
        });
        //to save new user to atlas
        await newUser.save();
        //useful when we r using thunderclient
        return res.status(300).json({message:"Successful"})
       
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})

//sign in
router.post("/sign-in",async(req,res)=>{
    try{
        const {username,password}=req.body;
        const existingUser= await User.findOne({username});
        if(!existingUser){
            res.status(400).json({message:"Invalid credentials"});
        }
        await bcrypt.compare(password,existingUser.password,(err,data)=>{
            if(data){
                const authClaims=[
                    {
                        name:existingUser.username
                    },
                    {
                        role:existingUser.role
                    },
                ];
                const token=jwt.sign({authClaims},"bookStore123",{expiresIn:"30d",});
                res.status(200).json({
                    id:existingUser.id,
                    role:existingUser.role,
                    token:token
                });
            }else{
                res.status(400).json({message:"Invalid password"});
            }
        })
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})







module.exports=router;