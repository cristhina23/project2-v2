const Product = require('../models/productModel');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      const error = new Error("There is not product to show yet");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(products)

  } catch (error) {
    console.error(error)
    next(error)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, category, image } = req.body;

    if (!name || !price || !stock) {
      const error = new Error("Name, price, and stock are required");
      error.status = 400; 
      return next(error);
    }

    if (price < 0 || stock < 0) {
      const error = new Error("Price and stock must be positive numbers");
      error.status = 400;
      return next(error);
    }

    const savedProduct = await Product.create({
      name,
      description,
      price,
      stock,
      image,
      category
    });


    res.status(200).json({
      success: true,
      data: savedProduct,
      message: 'Product saved successfully'
    })
    
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const getProductById = async (req, res, next) => {
  try {
    const productID = req.params.id;

    const product = await Product.findById(productID);

    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      return next(error);
    }

    res.status(201).json({
      success: true,
      data: product
    })

  } catch (error) {
    next(error)
  }
}

const updateProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      const error = new Error("Product not found");
      error.status = 404;
      return next(error);
    }

    const updatedProduct = {
      name: productData.name || existingProduct.name,
      description: productData.description || existingProduct.description,
      price: productData.price || existingProduct.price,
      stock: productData.stock || existingProduct.stock,
      image: productData.image || existingProduct.image,
      category: productData.category || existingProduct.category
    };

    const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });

    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully"
    });

  } catch (error) {
    next(error);
  }
};


const deleteProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      const error = new Error("Product not found");
      error.status = 404;
      return next(error);
    }
       const deletedProduct = await Product.findByIdAndDelete(productId);
       res.status(200).json({
        success: true,
        data: deletedProduct,
        message: "Product deleted successfully"
      });
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllProducts, createProduct, getProductById, updateProductById, deleteProductById }