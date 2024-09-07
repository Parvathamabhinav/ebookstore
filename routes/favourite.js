const router = require("express").Router();
const User=require("../models/user")
const Book=require("../models/book")
const {authenticateToken}=require("./userAuth")

//add favourites
router.put("/add-book-to-favourite",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}=req.headers;
        const userData=await User.findById(id);
        const isBookFavourite=userData.favourites.includes(bookid);
        if(isBookFavourite){
            return res.status(200).json({message:"Book already in favourites"});
        }
        //$push is used to add element to array
        await User.findByIdAndUpdate(id,{$push:{favourites: bookid}});
        return res.json({message:"Book added to favourites"}) 
    }catch(error){
        return res.json({message:"Internal error"})
    }
})

//delete from favourites
router.delete("/remove-book-from-favourite",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}=req.headers;
        const userData=await User.findById(id);
        const isBookFavourite=userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
        }
        return res.json({message:"Book removed from favourites"}) 
    }catch(error){
        return res.json({message:"Internal error"})
    }
})

//get favourite books of a particular user
router.get("/get-favourite-books",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        // console.log("1");
        const userData=await User.findById(id).populate("favourites");//remove populate and see
        if(!userData){
            console.log("Not found")
        }

        const favouriteBooks=userData.favourites;
       
        return res.json({
            status:"Success",
            data:favouriteBooks,
        });
    }catch(error){
        console.log(error)
        res.json({message:"Internal server problem"})
    }
})





module.exports=router;