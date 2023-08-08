import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

export const getAllCustomers = createAsyncThunk(
  "customers/getAllCustomers",
  async (thunkAPI) => {
    try {
      const res = await api.get("/users");
      const data = await res.data;

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const getCustomer = createAsyncThunk(
  "customers/getCustomer",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/users/${id}`);
      const data = await res.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/users/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const createCustomer = createAsyncThunk(
  "customers/createCustomer",
  async (state, thunkAPI) => {
    try {
      const res = await api.post(`/users`, state);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

// export const updateCustomer = createAsyncThunk(
//     "customers/updateCustomer",
//     async (state, thunkAPI) => {
//       try {
//         await api.put(`/users/${state.id}`,);
//         return id;
//       } catch (err) {
//         return thunkAPI.rejectWithValue({ error: err.response.data });
//       }
//     }
//   );

const customerReducer = createSlice({
  name: "customers",
  initialState: {
    customers: null,
    customer: null,
    error: null,
    loading: false,
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCustomer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.customers.push(action.payload.user);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(createCustomer.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
    builder.addCase(getAllCustomers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllCustomers.fulfilled, (state, action) => {
      state.customers = action.payload.users;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getAllCustomers.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
    builder.addCase(getCustomer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.customer = action.payload.user;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getCustomer.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
    builder.addCase(deleteCustomer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.customers = state.customers.filter(
        (customer) => customer._id !== action.payload
      );
      state.error = null;
      state.loading = false;
    });
    builder.addCase(deleteCustomer.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
  },
});

export const { removeError } = customerReducer.actions;

export default customerReducer.reducer;
