import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (thunkAPI) => {
    try {
      const res = await api.get("/orders");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const getOrder = createAsyncThunk(
  "orders/getOrder",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/orders/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async (state, thunkAPI) => {
    try {
      const res = await api.put(`/orders/${state.id}`, state);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/orders/${id}`);
      return id;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

const orderReducer = createSlice({
  name: "orders",
  initialState: {
    orders: null,
    error: null,
    loading: false,
    order: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
    builder.addCase(getOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.order = action.payload.order;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
    builder.addCase(updateOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.orders = state.orders?.filter(
        (order) => order._id !== action.payload.order._id
      );
      state.orders.push(action.payload.order);
      state.order = action.payload.order;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.error = action.payload.error.message;
      state.loading = false;
    });
    builder.addCase(deleteOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
      state.error = null;
      state.loading = false;
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
  },
});

export default orderReducer.reducer;
