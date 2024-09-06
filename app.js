const express=require("express")
const app=express();
app.use(express.json())
require("dotenv").config();
require("./conn/conn")
const user=require("./routes/user")
app.use("/api/v1",user)
app.get("/",(req,res)=>{
    res.send("Hello from backend ")
})
app.listen(process.env.port,()=>{
    console.log(`Server started at ${process.env.port}`);
})