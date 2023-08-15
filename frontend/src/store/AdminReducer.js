import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

export const getQuickStats = createAsyncThunk(
  "admins/getQuickStats",
  async (thunkAPI) => {
    try {
      const res = await api.get("/admins/quick-stats");
      const data = await res.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

const AdminsReducer = createSlice({
  name: "admins",
  initialState: {
    quickStats: null,
    error: null,
    loading: false,
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuickStats.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getQuickStats.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.quickStats = action.payload;
    });
    builder.addCase(getQuickStats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export const { removeError } = AdminsReducer.actions;

export default AdminsReducer.reducer;
