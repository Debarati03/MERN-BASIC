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


const allowedOrigins = [
  "https://mern-basic-lc7u.onrender.com", // Deployed frontend
  "http://localhost:5000/api/products", // Local frontend (if using React, default port is 3000)
];

app.use(
  cors({
    origin: allowedOrigins, // Allow multiple origins
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
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
