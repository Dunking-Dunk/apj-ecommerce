import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

export const getAllBillboard = createAsyncThunk(
  "billboard/getAllBillboard",
  async (thunkAPI) => {
    try {
      const res = await api.get("/billboards");
      const data = await res.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const createBillboard = createAsyncThunk(
  "billboard/createBillboard",
  async (body, thunkAPI) => {
    try {
      const res = await api.post(`/billboards`, body);
      const data = await res.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const deleteBillboard = createAsyncThunk(
  "billboard/deleteBillboard",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/billboards/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

const CategoryReducer = createSlice({
  name: "billboard",
  initialState: {
    billboards: [],
    error: null,
    loading: false,
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBillboard.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllBillboard.fulfilled, (state, action) => {
      state.billboards = action.payload.billboards;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getAllBillboard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
    builder.addCase(createBillboard.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createBillboard.fulfilled, (state, action) => {
      state.billboards.push(action.payload.billboard);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createBillboard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
    builder.addCase(deleteBillboard.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteBillboard.fulfilled, (state, action) => {
      state.billboards = state.billboards.filter(
        (billboard) => billboard._id !== action.payload
      );
      state.error = null;
      state.loading = false;
    });
    builder.addCase(deleteBillboard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export const { removeError } = CategoryReducer.actions;

export default CategoryReducer.reducer;
