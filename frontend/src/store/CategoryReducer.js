import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

export const getAllCategory = createAsyncThunk(
  "category/getAllCategory",
  async (thunkAPI) => {
    try {
      const res = await api.get("/category/");
      const data = await res.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/category/${id}`);
      const data = await res.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (body, thunkAPI) => {
    try {
      const res = await api.post(`/category`, body);
      const data = await res.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(`/category/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

const CategoryReducer = createSlice({
  name: "category",
  initialState: {
    categories: [],
    category: null,
    error: null,
    loading: false,
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getAllCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
    builder.addCase(getCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.category = action.payload.category;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
    builder.addCase(createCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload.category);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
    builder.addCase(deleteCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
      state.error = null;
      state.loading = false;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export const { removeError } = CategoryReducer.actions;

export default CategoryReducer.reducer;
