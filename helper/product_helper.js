const Product = require('../db').Product;

const addProduct = async (productData) => {
    try {
        const product = new Product({
            name: productData.name,
            description: productData.description,
            price: productData.price,
            category: productData.category,
            image: productData.image
        });
        await product.save();
        return product;
    } catch (error) {
        throw new Error(error.message);
    }
};

const findAllProducts = async () => {
    try {
        const products = await Product.find({});
        return products;
    } catch (error) {
        throw new Error(error.message);
    }
};

const findProduct = async (productId) => {
    try {
        const product = await Product.findById(productId);
        return product;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteProduct = async (productId) => {
    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            throw new Error(`Product with ID ${productId} not found.`);
        }
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateProduct = async (newProduct, productId) => {
    try {
        const currentTime = new Date();
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            ...newProduct,
            updatedAt: currentTime
        }, { new: true });
        if (!updatedProduct) {
            throw new Error("Product not found");
        }
        return updatedProduct;
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = { 
    addProduct,
    findAllProducts,
    findProduct,
    deleteProduct,
    updateProduct
};
