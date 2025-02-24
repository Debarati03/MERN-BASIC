import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import path from "path"

import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON

const PORT =  process.env.PORT || 5000;

const __dirname = path.resolve();


app.use(
  cors({
    origin: "https://mern-basic-lc7u.onrender.com", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/products",productRoutes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'/frontend/dist')));
  app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'frontend','dist','index.html')));
}
  
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:"+PORT);
});
