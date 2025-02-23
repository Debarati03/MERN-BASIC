import  Product from '../models/product.model.js';

export const createProducts=async (req, res) => {
    const product = req.body;
  
    if (!product.name || !product.price || !product.image) {
      return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
  
    try {
      const newProduct = new Product(product); // Now Product is defined
      await newProduct.save();
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      console.log("Error in create product:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };

export const getProducts=async (req,res) =>{
    try{
      const products=await Product.find();
      res.status(200).json({succes:true,data:products});
    }catch(error){
      console.log("Error finding product:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
  
    }
  };

export const putProducts=async(req,res)=>{
  
    const product = req.body;
    const {id}=req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }
  
    try{
      const updateProduct =await Product.findByIdAndUpdate(id,product,{new:true});
      res.status(301).json({ success: true, message: updateProduct });
  
    }catch(error){
      res.status(200).json({ success: false, message: "Server Error" });
  
    }
  };  

export const deleteProducts = async (req,res)=>{
  
    const {id}=req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try{
     await Product.findByIdAndDelete(id);
      res.status(200).json({ success: true, message:"Product deleted" });
    }catch(error){
      console.log("Error in deleting product:", error.message);
  }};  

