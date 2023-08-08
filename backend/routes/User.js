import express from "express";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/User.js";
import sendToken from "../utils/sendToken.js";
import { authenticatedUser, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, password, email } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

router.post("/login", async (req, res, next) => {
  const { password, email } = req.body;

  if (!password || !email)
    return next(new ErrorHandler("Please enter email and password", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid email or password", 401));

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid)
    return next(new ErrorHandler("Invalid email or password", 401));

  sendToken(user, 201, res);
});

router.post("/logout", async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

router.get("/me", authenticatedUser, async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

router.get("/", authenticatedUser, authorizeRole("admin"), async (req, res) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
});

router.get(
  "/:id",
  authenticatedUser,
  authorizeRole("admin"),
  async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);

    res.status(200).json({
      success: true,
      user,
    });
  }
);

router.post(
  "/",
  authenticatedUser,
  authorizeRole("admin"),
  async (req, res) => {
    const { name, password, email } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(200).json({
      success: true,
      user,
    });
  }
);

router.put(
  "/:id",
  authenticatedUser,
  authorizeRole("admin"),
  async (req, res) => {
    const { id } = req.params;

    let user = await User.findById(id);

    if (!user) return next(new ErrorHandler("user not found", 404));

    user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      user,
    });
  }
);

router.delete(
  "/:id",
  authenticatedUser,
  authorizeRole("admin"),
  async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) return next(new ErrorHandler("user not found", 404));

    await User.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  }
);

export default router;
