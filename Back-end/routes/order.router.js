import {
  createOrder,
  getOneOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";
import express from "express";

export const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.get("/getall", getAllOrders);
orderRouter.get("/:id", getOneOrder);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);
