// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const username = process.env.USERNAME
const password = process.env.PASSWORD

// const url = 'mongodb://localhost:27017/db';
const url = `mongodb+srv://${username}:${password}@products.prfoq7j.mongodb.net/?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true 
};

mongoose.connect(url, connectionParams)
.then( () => {
  console.log('Connected to the database ')
})
.catch( (err) => {
  console.error(`Error connecting to the database. n${err}`);
})

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productsSchema);
module.exports = { Product };
// export { Product };

/*

[
  {
    "name": "iPhone XR",
    "description": "The latest iPhone model with a large LCD display and powerful A12 Bionic chip.",
    "price": "749.00",
    "category": "Electronics",
    "image": "https: //www.apple.com/iphone-xr/images/overview/og.jpg"
},
  {
    "name": "Sony PlayStation 5",
    "description": "The next-generation gaming console with lightning-fast load times and ray tracing technology.",
    "price": "499.99",
    "category": "Gaming",
    "image": "https://www.sony.com/image/playstation-5-platform-hero-03-en-2021-01-08?fmt=png-alpha&wid=1280"
},
  {
    "name": "Bose QuietComfort 35 II Wireless Headphones",
    "description": "Noise-cancelling wireless headphones with a built-in microphone and Alexa voice control.",
    "price": "349.00",
    "category": "Audio",
    "image": "https://www.bose.com/content/dam/Bose_DAM/Web/consumer/global/products/headphones/quietcomfort_35_ii/product_silo_images/qc35_ii_black_EC_hero.psd/_jcr_content/renditions/cq5dam.web.1280.1280.png"
},
  {
    name: 'Canon EOS Rebel T8i DSLR Camera',
    description: 'A high-performance DSLR camera with a 45-point all cross-type AF system and 4K video capability.',
    price: 799.00,
    category: 'Photography',
    image: 'https://www.usa.canon.com/internet/wcm/connect/us/98c1b5a9-7ed8-4f5a-aabc-f1ef76b869b3/Rebel-T8i-EF-S-18-55mm-IS-STM-Kit.png?MOD=AJPERES',
  },
  {
    name: 'Nike Air Zoom Pegasus 37',
    description: 'A comfortable running shoe with a Zoom Air unit in the heel and a breathable mesh upper.',
    price: 120.00,
    category: 'Sporting Goods',
    image: 'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/i1-47b1569d-acbb-4fd3-a34a-b32c5b2edaa9/air-zoom-pegasus-37-running-shoe-hBgq3t.jpg',
  }
]


*/