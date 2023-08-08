import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (initialBody, thunkAPI) => {
    try {
      const res = await api.post("/users/login", initialBody);
      const data = await res.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (initialBody, thunkAPI) => {
    try {
      const res = await api.post("/users/register", initialBody);
      const data = await res.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const getUser = createAsyncThunk("users/getUser", async (thunkAPI) => {
  try {
    const res = await api.get("/users/me");
    const data = await res.data;
    return data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue({ error: err.response.data });
  }
});

export const logoutUser = createAsyncThunk("users/logout", async (thunkAPI) => {
  try {
    await api.post("/users/logout");
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue({ error: err.response.data });
  }
});

export const getUserOrders = createAsyncThunk(
  "user/userOrders",
  async (thunkAPI) => {
    try {
      const res = await api.get("/orders/me");
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const getUserOrder = createAsyncThunk(
  "user/userOrder",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/orders/me/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

const userReducer = createSlice({
  name: "users",
  initialState: {
    loading: false,
    user: null,
    error: null,
    isAuthenticated: false,
    orders: null,
    order: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload.error;
      state.isAuthenticated = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = "";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload.error;
      state.isAuthenticated = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = "";
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = action.payload?.error;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(getUserOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.loading = false;
    });
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.error = action.payload?.error;
      state.loading = false;
    });
    builder.addCase(getUserOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserOrder.fulfilled, (state, action) => {
      state.order = action.payload.order;
      state.loading = false;
    });
    builder.addCase(getUserOrder.rejected, (state, action) => {
      state.error = action.payload?.error;
      state.loading = false;
    });
  },
});

export default userReducer.reducer;
