import mongoose from "mongoose";

const productModelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductSchema = mongoose.model("ProductSchema", productModelSchema);

export default ProductSchema;
