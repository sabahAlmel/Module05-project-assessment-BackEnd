import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.router.js";
import { authRouter } from "./routes/auth.router.js";
import { productRouter } from "./routes/products.router.js";
import { orderRouter } from "./routes/order.router.js";

dotenv.config();

// express app
const app = express();
app.use(express.json());
app.use(cors());
app.use("/images", express.static("images"));

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/auth", authRouter);

async function startServer() {
  mongoose.connection.once("open", () => {
    console.log("mongo is ready");
  });

  mongoose.connection.on("error", (err) => {
    console.error(err);
  });
  await mongoose.connect(process.env.MONGO_URI);

  app.listen(process.env.PORT, () => {
    console.log("listening on port: " + process.env.PORT);
  });
}

startServer();
