const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const db = require("./config/mongoose-connection");

const userSchema = require("./models/user-model");
const productSchema = require("./models/product-model");

const indexRouter = require("./routes/index");
const ownerRouter = require("./routes/ownersRouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");

require("dotenv").config();

const PORT = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/owner", ownerRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log("App is running on port 3000");
});
