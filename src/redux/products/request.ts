import { productsRoute, productsSearchRoute } from 'src/services/urls';
import { ProductFetchData, RDTFetchProducts, RDTSearchProduct } from './types';
import { instance } from 'src/services';

export const getProducts = (params: RDTFetchProducts) =>
  instance.get<ProductFetchData>(productsRoute, { params });

export const searchProducts = (params: RDTSearchProduct) =>
  instance.get<ProductFetchData>(productsSearchRoute, { params });
