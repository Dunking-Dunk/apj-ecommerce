import express from "express";
import { authenticatedUser, authorizeRole } from "../middleware/auth.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const router = express.Router();

router.get(
  "/quick-stats",
  authenticatedUser,
  authorizeRole("admin"),
  async (req, res) => {
    const totalProducts = await Product.countDocuments({});
    const totalProductsInStock = await Product.countDocuments({
      stock: { $gt: 0 },
    });
    const totalProductsOutOfStock = await Product.countDocuments({
      stock: { $lte: 0 },
    });

    const totalRevenues = await Order.aggregate([
      {
        $group: {
          _id: null,
          "Total Sales": {
            $sum: "$itemsPrice",
          },
        },
      },
    ]);

    const totalOrders = await Order.countDocuments({});
    const processingOrders = await Order.countDocuments({
      orderStatus: "Processing",
    });
    const shippedOrders = await Order.countDocuments({
      orderStatus: "Shipped",
    });
    const deliveredOrders = await Order.countDocuments({
      orderStatus: "Delivered",
    });
    const totalCustomers = await User.countDocuments({ role: "user" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    const products = [
      {
        title: "Total Products",
        value: totalProducts,
      },
      {
        title: "Total Products In-stock",
        value: totalProductsInStock,
      },
      {
        title: "Total Products Out-of-stock",
        value: totalProductsOutOfStock,
      },
    ];
    const orders = [
      {
        title: "Total Orders",
        value: totalOrders,
      },
      {
        title: "Total Orders Processed",
        value: processingOrders,
      },
      {
        title: "Total Orders Shipped",
        value: shippedOrders,
      },
      {
        title: "Total Orders Delivered",
        value: deliveredOrders,
      },
      {
        title: "Total Revenue",
        value: `Rs ${totalRevenues[0]["Total Sales"]}`,
      },
    ];

    const users = [
      {
        title: "Total Customers",
        value: totalCustomers,
      },
      {
        title: "Total Admins",
        value: totalAdmins,
      },
    ];
    res.status(200).json({ orders, products, users });
  }
);

router.get(
  "/stats-revenue",
  authenticatedUser,
  authorizeRole("admin"),
  async (req, res) => {}
);

export default router;
