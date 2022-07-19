const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user-gate", proxy("http://localhost:8001"));
app.use("/product-gate", proxy("http://localhost:8002")); //product endpoint
app.use("/order-gate", proxy("http://localhost:8003"));

app.listen(8000, () => {
  console.log("Gateway is listening to Port 8000");
});
