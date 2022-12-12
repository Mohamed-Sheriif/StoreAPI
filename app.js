const express = require("express");

const app = express();
const notFound = require("./middleware/not-found");
const errHndlingMiddleware = require("./middleware/error-handler");
require("express-async-errors");
require("dotenv").config();
const connectDB = require("./db/connect");
const productsRoute = require("./routes/products");

//middleware
app.use(express.json());

//rootes
app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/v1/products"> Products Route</a>`);
});

app.use("/api/v1/products", productsRoute);

//products route

app.use(notFound);
app.use(errHndlingMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`app is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
