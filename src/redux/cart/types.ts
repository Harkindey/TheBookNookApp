export type CartState = {
  [id: Product['id']]: {
    quantity: number;
  } & Product;
};
