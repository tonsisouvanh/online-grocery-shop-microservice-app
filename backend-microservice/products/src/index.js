// const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 8002;
const appEvents = require('./middleware/app-events')

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/ratings", require("./routes/ratingRoutes"));


app.use(errorHandler);

appEvents(app);

app.listen(port, () => console.log(`Server started on port ${port}`));
