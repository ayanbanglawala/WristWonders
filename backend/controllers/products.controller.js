import Product from "../models/productAdmin.model.js";

export const productsAll = async(req,res)=>{
    try {
        const products = await Product.find();
        if (products.length === 0) {
            res.status(400).json({message: "No products available in the site for now"})
        }
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products" });
    }
}

export const productById = async(req, res)=>{
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Errror"})
    }
}

export const searchQuery = async (req, res) => {
    try {
      const searchTerm = req.query.query;
  
      // Check if search term is provided
      if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
      }
  
      // Find products where the name matches the search term (case-insensitive)
      const products = await Product.find({
        name: { $regex: searchTerm, $options: 'i' } // 'i' for case-insensitive
      });
  
      // Check if any products were found
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found' });
      }
  
      // Return the found products
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to search for products' });
    }
  };