import express from "express";
import cloudinary from "cloudinary";
import { authenticatedUser, authorizeRole } from "../middleware/auth.js";
import Category from "../models/Category.js";
import ErrorHandler from "../utils/errorHandler.js";
import Product from "../models/Product.js";

const router = express.Router();

router.post(
  "/",
  authenticatedUser,
  authorizeRole("admin"),
  async (req, res) => {
    const image = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "/category",
    });

    const category = await Category.create({
      title: req.body.title,
      image: {
        public_id: image.public_id,
        url: image.secure_url,
      },
    });

    res.status(201).json({ type: "success", category });
  }
);

router.get("/", async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json({ type: "success", categories });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById({ _id: id }).populate("products");

  if (!category) return next(ErrorHandler("Category not found", 404));

  res.status(200).json({ type: "success", category });
});

router.delete(
  "/:id",
  authenticatedUser,
  authorizeRole("admin"),
  async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) return next(ErrorHandler("Category not found", 404));

    await category.products.map(async (product) => {
      await Product.findByIdAndUpdate(product, {
        $pull: {
          category: id,
        },
      });
    });

    await Category.findByIdAndDelete(id);

    res.status(200).json({ type: "success", message: "deleted successfuly" });
  }
);

export default router;
