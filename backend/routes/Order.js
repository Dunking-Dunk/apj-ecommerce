import express from "express";
import Order from "../models/Order.js";
import { authenticatedUser, authorizeRole } from "../middleware/auth.js";
import ErrorHandler from "../utils/errorHandler.js";
import Product from "../models/Product.js";

const router = express.Router();

//get all users order
router.get("/me", authenticatedUser, async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(200).json({ success: true, orders });
});

router.get("/me/:id", authenticatedUser, async (req, res) => {
  const order = await Order.find({
    userId: req.user._id,
    customerId: req.params.id,
  }).populate("userId", "name email");
  res.status(200).json({ success: true, order: order[0] });
});

//get single orders
router.get("/:id", authenticatedUser, async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "userId",
    "name email"
  );

  res.status(200).json({ success: true, order });
});

//get all orders --admin
router.get("/", authenticatedUser, authorizeRole("admin"), async (req, res) => {
  const orders = await Order.find({}).populate("userId", "name email");

  res.status(200).json({ success: true, orders });
});

//update order status --admin

router.put(
  "/:id",
  authenticatedUser,
  authorizeRole("admin"),
  async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return next(ErrorHandler("Order not found with this id", 404));

    if (order.orderStatus === "Delivered")
      return next(
        new ErrorHandler("You have already delivered this order", 400)
      );

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity, next);
      });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, order });
  }
);

async function updateStock(id, quantity, next) {
  const product = await Product.findById(id);
  if (product.stock > 0) {
    product.stock -= quantity;
  } else {
    return next(new ErrorHandler("There is no stock", 400));
  }

  await product.save({ validateBeforeSave: false });
}

//delete order -- admin

router.delete(
  "/:id",
  authenticatedUser,
  authorizeRole("admin"),
  async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await Order.findByIdAndDelete(order._id);

    res.status(200).json({
      success: true,
    });
  }
);

export default router;
