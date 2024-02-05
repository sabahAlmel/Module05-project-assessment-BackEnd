import ProductSchema from "../models/products.model.js";
import mongoose from "mongoose";
import fs from "fs";

function removeImage(image) {
  fs.unlinkSync(image, (err) => {
    if (err) {
      console.log(`we can't delete the image`);
    } else {
      console.log("image deleted");
    }
  });
}

export const getAll = async (req, res, next) => {
  try {
    const products = await ProductSchema.find();
    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};

// Fetch one product by id
export const getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductSchema.findOne({ _id: id });

    if (product) {
      return res.json({
        message: "Fetched one product",
        fetchedProduct: product,
      });
    } else {
      return res.status(404).json({ error: "Product Not Found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error!" });
  }
};

// Update Product

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  try {
    const { title, price, description } = req.body;
    const images = req.files ? req.files.map((image) => image.path) : null;

    let newProduct;
    if (req.files) {
      newProduct = await ProductSchema.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            title: title,
            price: price,
            description: description,
            images: images,
          },
        }
      );
    } else {
      newProduct = await ProductSchema.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            title: title,
            price: price,
            description: description,
          },
        }
      );
    }
    return res.status(200).json({ newProduct });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Trouble updating Product info" });
  }
};

// Delete product

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductSchema.findOneAndDelete({ _id: id });
    if (product) {
      console.log(product);
      if (product.images) {
        product.images.map((image) => removeImage(image));
      }
      return res.status(200).json({ message: "deleted successfully !" });
    } else {
      return res.status(404).json({ message: "product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "error deleting product", error: err });
  }
};
//create product

export const createProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const images = req.files ? req.files.map((image) => image.path) : null;
    const newProduct = new ProductSchema({
      title: title,
      price: price,
      description: description,
      images: images,
    });
    await newProduct.save();
    res
      .status(200)
      .json({ message: "product added successfully !", product: newProduct });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem adding product", error: err });
  }
};
