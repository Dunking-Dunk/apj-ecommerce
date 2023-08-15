import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (thunkAPI) => {
    try {
      const res = await api.get("/products");
      const data = await res.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const getSearchedProducts = createAsyncThunk(
  "products/getSearchedProducts",
  async (query, thunkAPI) => {
    try {
      const res = await api.get(`/products?search=${query}`);
      const data = await res.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (body, thunkAPI) => {
    try {
      const res = await api.get(`/products/${body}`);
      const data = await res.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (body, thunkAPI) => {
    try {
      const res = await api.post("/products", body);
      const data = await res.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (state, thunkAPI) => {
    try {
      const res = await api.put(`/products/${state.id}`, {
        name: state.name,
        description: state.description,
        price: state.price,
        stock: state.stock,
        images: state.images,
        category: state.category,
        color: state.color,
        user: state.user,
      });
      const data = await res.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (body, thunkAPI) => {
    try {
      await api.delete(`/products/${body}`);
      return body;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue({ error: err.response.data });
    }
  }
);

const productsReducer = createSlice({
  name: "products",
  initialState: {
    products: [],
    category: [],
    error: null,
    loading: false,
    product: null,
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
    builder.addCase(getSearchedProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSearchedProducts.fulfilled, (state, action) => {
      state.category = action.payload.products;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getSearchedProducts.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
    builder.addCase(getProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload.product;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
    builder.addCase(createProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products.push(action.payload.product);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
    builder.addCase(updateProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload.product._id
      );
      state.products.push(action.payload.product);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
    builder.addCase(deleteProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.error = null;
      state.loading = false;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
  },
});

export const { removeError } = productsReducer.actions;

export default productsReducer.reducer;
