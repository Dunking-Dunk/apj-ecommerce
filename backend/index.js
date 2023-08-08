import "dotenv/config";
import bodyParser from "body-parser";
import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import ProductRouter from "./routes/Product.js";
import UserRouter from "./routes/User.js";
import PaymentRouter from "./routes/Payment.js";
import OrderRouter from "./routes/Order.js";
import WebHookRouter from "./routes/Webhook.js";
import ErrorHandler from "./middleware/error.js";

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("successfully connected to Mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

cloudinary.config({
  cloud_name: "diqcvwlmu",
  api_key: "431324572471635",
  api_secret: process.env.CLOUDINARY_API_KEY,
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use("/api/payment", WebHookRouter);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/products", ProductRouter);
app.use("/api/users", UserRouter);
app.use("/api/payment", PaymentRouter);
app.use("/api/orders", OrderRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

app.use(ErrorHandler);

app.listen(3001, () => {
  console.log("listening to port 3001");
});
