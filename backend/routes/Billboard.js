import express from "express";
import cloudinary from "cloudinary";
import { authenticatedUser, authorizeRole } from "../middleware/auth.js";
import Billboard from "../models/Billboard.js";
import ErrorHandler from "../utils/errorHandler.js";

const router = express.Router();

router.post(
  "/",
  authenticatedUser,
  authorizeRole("admin"),
  async (req, res) => {
    const image = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "/billboard",
    });

    const billboard = await Billboard.create({
      title: req.body.title,
      image: {
        public_id: image.public_id,
        url: image.secure_url,
      },
      link: req.body?.link,
    });

    res.status(201).json({ type: "success", billboard });
  }
);

router.get("/", async (req, res) => {
  const billboards = await Billboard.find({});
  res.status(200).json({ type: "success", billboards });
});

router.delete(
  "/:id",
  authenticatedUser,
  authorizeRole("admin"),
  async (req, res) => {
    const { id } = req.params;

    const billboard = await Billboard.findByIdAndDelete({ _id: id });

    if (!billboard) return next(ErrorHandler("Billboard not found", 404));

    res.status(200).json({ type: "success", message: "deleted successfuly" });
  }
);

export default router;
