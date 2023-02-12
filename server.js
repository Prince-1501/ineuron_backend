const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const productHelper = require('./helper/product_helper.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Products API',
        version: '1.0.0',
        description: 'This is a simple Products API for demonstration purposes.',
      },
      // basePath: 'http://localhost:3000',
      basePath: 'https://ineuron-backend-5dpekm446-prince-1501.vercel.app',
    },
    apis: ['./api-docs.yml'],
  };
  
const specs = swaggerJsdoc(options);  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.get('/', (req, res) => {
    res.send("welcome to Ineuron Backend Assignment");
});

// Add the Products
app.post('/add', async(req,res)=>{
    try{
      console.log("post request");
      console.log(req.body);
      const productData = req.body;
      await productHelper.addProduct(productData);
      res.status(200).send('Product Added successfully');
    }catch(err){
      res.status(401).send({ error: err });
    }
});

// List of all Products
app.get('/products', async(req,res)=>{
    try{
        const allProducts = await productHelper.findAllProducts();
        res.status(200).send(allProducts);
    }catch(err){
        res.status(401).send({ error: err });
      }
});

// Find the Products
app.get('/find/:id', async(req, res) =>{
    try{
        const id = req.params.id;
        const product = await productHelper.findProduct(id);
        res.status(200).send(product);
    }
    catch(err){
        res.status(401).send({ error: err });
    }
});

// Delete the Product
app.delete('/delete/:id', async(req, res) => {
    try{
        const id = req.params.id;
        await productHelper.deleteProduct(id);
        res.status(200).send({ message: "Product deleted successfully." });
    }
    catch(err){
        res.status(401).send({ error: err });
    }
});

// update the Product
app.put('/update/:id', async(req, res) => {
    try{
        console.log("update request");
        console.log(req.body);
        const id = req.params.id;
        const newProductData = req.body;
        await productHelper.updateProduct(newProductData,id);
        res.status(200).send({ message: "Product updated successfully." });
    }
    catch(err){
        res.status(401).send({ error: err });
    }
});

const port = 3000;
app.listen(port, () => console.log(`Backend server is LIVE and running on port ${port}`));
