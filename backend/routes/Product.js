import express from "express";
import cloudinary from "cloudinary";
import Product from "../models/Product.js";
import ErrorHandler from "../utils/errorHandler.js";
import { authenticatedUser, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  authenticatedUser,
  authorizeRole("admin"),
  async (req, res) => {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  }
);

router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({
    success: true,
    products,
  });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("product not found", 404));

  res.status(200).json({
    success: true,
    product,
  });
});

router.put(
  "/:id",
  authenticatedUser,
  authorizeRole("admin"),
  async (req, res, next) => {
    const { id } = req.params;

    let product = await Product.findById(id);

    if (!product) return next(new ErrorHandler("product not found", 404));
    let images = [];

    if (typeof req.body.images === "string") images.push(req.body.images);
    else images = req.body.images;

    if (images === undefined) {
      for (let i of product.images) {
        await cloudinary.v2.uploader.destroy(i.public_id);
      }
    }

    const images_link = [];

    for (let i of images) {
      const result = await cloudinary.v2.uploader.upload(i, {
        folder: "products",
      });

      images_link.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = images_link;

    product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  }
);

router.delete(
  "/:id",
  authenticatedUser,
  authorizeRole("admin"),
  async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) return next(new ErrorHandler("product not found", 404));

    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await Product.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "successfully deleted product",
    });
  }
);

export default router;
