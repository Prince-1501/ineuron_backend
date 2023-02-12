const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const assert = require('chai').assert;

const productService = require('../helper/product_helper');

describe('Product service test cases', () => {

  let productId = "Dummy Product Id"
  it('Should get all products', async () => {
    const products = await productService.findAllProducts();
    assert.isArray(products);
    assert.isNotEmpty(products);
  });

  it('Should add a product', async () => {
    const product = {
      name: 'iPhone XR',
      description: 'The latest iPhone model with a large LCD display and powerful A12 Bionic chip.',
      price: '749.00',
      category: 'Electronics',
      image: 'https://www.apple.com/iphone-xr/images/overview/og.jpg'
    };

    const newProduct = await productService.addProduct(product);
    productId = newProduct._id;
    assert.isObject(newProduct);
    assert.equal(newProduct.name, product.name);
    assert.equal(newProduct.description, product.description);
  });

  it("should return a product object", async () => {
        const product = await productService.findProduct(productId);
        assert.isObject(product);
        assert.property(product, "name");
        assert.property(product, "description");
        assert.property(product, "price");
        assert.property(product, "category");
        assert.property(product, "image");
 });

 it("should update a product and return the updated product", async () => {
    const newProduct = {
        name: "New iPhone Model",
        description: "The latest iPhone model with improved features and a powerful A13 Bionic chip.",
        price: "999.00",
        category: "Electronics",
        image: "https://www.apple.com/iphone/images/og.jpg"
    };
    const updatedProduct = await productService.updateProduct(newProduct, productId);
    assert.isObject(updatedProduct);
    assert.property(updatedProduct, "name");
    assert.property(updatedProduct, "description");
    assert.property(updatedProduct, "price");
    assert.property(updatedProduct, "category");
    assert.property(updatedProduct, "image");
    assert.equal(updatedProduct.name, newProduct.name);
    assert.equal(updatedProduct.description, newProduct.description);
    assert.equal(updatedProduct.price, newProduct.price);
    assert.equal(updatedProduct.category, newProduct.category);
    assert.equal(updatedProduct.image, newProduct.image);
});

it("should delete a product and return true", async () => {
    const result = await productService.deleteProduct(productId);
    assert.equal(result, true);
});

});
