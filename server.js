require("dotenv").config()
const express=require("express");
const path=require("path")
const dbconnect=require("./src/config/dbconnect")
const categoryRoutes = require("./src/routes/category.routes");
const brandRoutes = require("./src/routes/brands.routes");
const userRoutes = require("./src/routes/users.routes");
const reviewRoutes = require("./src/routes/reviews.routes");
const productRoutes = require("./src/routes/products.routes");
const app=express();

dbconnect()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"./public")))

app.get("/",(req,res)=>{
    res.send("app working")
})
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/brands", brandRoutes);
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);

app.listen("5000",()=>{
    console.log("server working")
})