export const addProduct = async (req, res) => {
    try {
        // Extracting product details from request body
        const { name, brand, price, description, stock, images } = req.body;

        if (!name || !price || !description || !stock) {
            return res.status(400).json({ message: "Name, price, description, and stock are required" });
        }
        const product = new Product({
            name,
            brand,
            price,
            description,
            stock,
            images
        });
        await product.save();
        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


export const getProducts = async(req,res)=>{
    res.send("GET PRODUCTS");
}

export const deleteProduct = async(req,res)=>{
    res.send("DELETE PRODUCT");
}

export const updateProduct = async(req,res)=>{
    res.send("UPDATED PRODUCT");
}