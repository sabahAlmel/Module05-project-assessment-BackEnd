import mongoose from "mongoose";

const orderModelSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductSchema",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const OrderSchema = mongoose.model("OrderSchema", orderModelSchema);

export default OrderSchema;
