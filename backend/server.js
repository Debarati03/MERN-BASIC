import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";


import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON

const PORT =  process.env.PORT || 5000;


app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/products",productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:"+PORT);
});
