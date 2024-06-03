export const DEFAULT_PRODUCT_PARAMS = {
  select: 'title,price,description,rating,category,reviews,images',
  limit: 20,
  skip: 0,
};

export type PaginationType = {
  limit: number;
  skip: number;
};
