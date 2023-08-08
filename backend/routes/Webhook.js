import express from "express";
import Stripe from "stripe";
import Order from "../models/Order.js";
import ErrorHandler from "../utils/errorHandler.js";

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_KEY);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        process.env.STRIPE_ENDPOINT_SECRET
      );
    } catch (err) {
      return next(ErrorHandler(err.message, 400));
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const data = event.data.object;
        stripe.customers.retrieve(data.customer).then((customer) => {
          createOrder(customer, data);
        });
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send("hello");
  }
);

const createOrder = async (customer, data) => {
  const { city, country, line1, line2, postal_code, state } =
    data.shipping_details.address;
  const { email, name, phone } = data.customer_details;
  const shippingInfo = {
    address: `${line1} ${line2} ${city} ${state} ${country} ${postal_code}`,
    city,
    state,
    country,
    pinCode: postal_code,
    phoneNo: phone,
    email,
    name,
  };
  const { cart, userId, subTotal } = customer.metadata;
  const parsedCart = await JSON.parse(cart);
  const orderItems = parsedCart.map((cart) => {
    return {
      name: cart.name,
      price: cart.price,
      quantity: cart.quantity,
      image: cart.image,
      product: cart.id,
    };
  });
  const paymentInfo = {
    id: data.id,
    status: data.status,
  };

  const orderData = {
    shippingInfo,
    orderItems,
    userId: JSON.parse(userId),
    customerId: data.customer,
    paymentInfo,
    paidAt: new Date(Date.now()),
    itemsPrice: subTotal,
    taxPrice: data.total_details.amount_tax,
    shippingPrice: data.total_details.amount_shipping,
    totalPrice: data.amount_total / 100,
  };
  try {
    await Order.create(orderData);
  } catch (err) {
    console.log(err);
  }
};

export default router;
