const mongoose=require("mongoose");

const order=new mongoose.Schema({
    user:{
            type:mongoose.Types.ObjectId,
            ref:"user",
    },
    book:{
        type:mongoose.Types.ObjectId,
        ref:"books",
    },
    status:{
        type:String,
        ref:"Order Placed",
        enum:["order Placed","Out for delivery, Delivered,canceled"],
    },
},{timestamps:true})
module.exports=mongoose.model("order",order);