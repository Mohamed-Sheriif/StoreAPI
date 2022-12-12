const connectDB = require("./db/connect");

require("dotenv").config();
const productsJSON = require("./products.json");
const Product = require("./models/product");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.create(productsJSON);
    console.log("success");
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

start();
