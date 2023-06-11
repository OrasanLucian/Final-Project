import { productsURL } from "../constants";

export const getProductsById = async (id) => {
  const response = await fetch(`${productsURL}/${id}`);
  const product = await response.json();
  return product;
};
