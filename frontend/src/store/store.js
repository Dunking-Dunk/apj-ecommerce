import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./ProductReducer";
import CartsReducer from "./CartsReducer";
import UserReducer from "./UserReducer";
import NotificationsReducer from "./NotificationReducer";
import CustomersReducer from "./CustomerReducer";
import OrderReducer from "./OrderReducer";

export default configureStore({
  reducer: {
    Products: ProductReducer,
    Carts: CartsReducer,
    User: UserReducer,
    Notifications: NotificationsReducer,
    Customers: CustomersReducer,
    Orders: OrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
