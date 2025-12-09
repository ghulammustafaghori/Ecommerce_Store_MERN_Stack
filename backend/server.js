const express=require('express');
const dotenv=require('dotenv');
const authRoutes=require('./routes/auth.route');
const productRoutes=require('./routes/product.route');

const connectDB=require('./lib/db');
const cookieParser=require('cookie-parser');

dotenv.config();
const app=express();

const PORT=process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT,()=>{
    console.log("server is running on port:",PORT);

    connectDB();
})