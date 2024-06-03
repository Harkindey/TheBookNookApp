import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectAllProdoucts = (state: RootState) =>
  state.products.products.data;

export const selectProductsById = createSelector(
  [selectAllProdoucts, (_, productId: number) => productId],
  (products, productId) => products?.find(product => product.id === productId),
);

export const selectProductsMeta = (state: RootState) =>
  state.products.products.meta;

export const selectProductsStatus = (state: RootState) => state.products.status;

export const selectProductsError = (state: RootState) => state.products.error;
