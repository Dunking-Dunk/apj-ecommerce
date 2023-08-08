import express from "express";
import Stripe from "stripe";
import { authenticatedUser } from "../middleware/auth.js";

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/create-checkout-session", authenticatedUser, async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: JSON.stringify(req.user._id),
      cart: JSON.stringify(req.body.carts),
      subTotal: req.body.subTotal,
    },
  });

  const lineItems = await req.body.carts.map((cart) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: cart.name,
          images: [cart.image],
        },
        unit_amount: cart.price * 100,
      },
      quantity: cart.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/success?id=${customer.id}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "INR",
          },
          display_name: "Free Shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
    ],
  });

  res.json({ sessionId: session.id });
});

export default router;
