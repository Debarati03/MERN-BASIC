import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import {createProducts,getProducts,putProducts,deleteProducts} from "../controllers/product.controller.js";

const router=express.Router();

router.post("/", createProducts);

router.get("/",getProducts);
  
router.put("/:id",putProducts);
  
router.delete("/:id",deleteProducts);

export default router;