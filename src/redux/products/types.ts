export type ProductsState = {
  products: {
    data: Product[] | null;
    meta: {
      total: number;
      skip: number;
      limit: number;
    };
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

export type ProductFetchData = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type RDTFetchProducts = {
  select?: string;
  limit?: number;
  skip?: number;
};
export type RDTSearchProduct = {
  q: string;
} & RDTFetchProducts;
