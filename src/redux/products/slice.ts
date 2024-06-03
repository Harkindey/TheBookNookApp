import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductsState, RDTFetchProducts, RDTSearchProduct } from './types';
import { getProducts, searchProducts } from './request';
import { omit } from 'lodash';
import { showErrorNotification } from 'src/utils/notification';

const initialState: ProductsState = {
  products: {
    data: null,
    meta: {
      total: 0,
      skip: 0,
      limit: 0,
    },
  },
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: RDTFetchProducts) => {
    const response = await getProducts(params);
    return response.data;
  },
);

export const searchfetchProducts = createAsyncThunk(
  'products/searchFetchProducts',
  async (params: RDTSearchProduct) => {
    const response = await searchProducts(params);
    return response.data;
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: state => {
      state.products.data = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';

        if (state.products.meta.skip < action.payload.skip) {
          state.products.data?.push(...action.payload?.products);
        } else {
          state.products.data = action.payload?.products || [];
        }
        state.products.meta = omit(action.payload, 'products');
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        showErrorNotification({
          alertTitle: 'Fetch Error',
          message: action.error.message || '',
        });
        state.status = 'failed';
        state.error = action.error.message || null;
      });
    builder
      .addCase(searchfetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(searchfetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.data = action.payload?.products || [];
        state.products.meta = omit(action.payload, 'products');
      })
      .addCase(searchfetchProducts.rejected, (state, action) => {
        showErrorNotification({
          alertTitle: 'Search Error',
          message: action.error.message || '',
        });
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { clearProducts } = productsSlice.actions;

export default productsSlice.reducer;
