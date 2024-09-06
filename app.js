const express=require("express")
const app=express();
app.use(express.json())
require("dotenv").config();
require("./conn/conn")
const User=require("./routes/user")
const Books=require("./routes/book")
const favourite=require("./routes/favourite")

app.use("/api/v1",User)
app.use("/api/v1",Books)
app.use("/api/v1",favourite)


app.get("/",(req,res)=>{
    res.send("Hello from backend ")
})
app.listen(process.env.port,()=>{
    console.log(`Server started at ${process.env.port}`);
})