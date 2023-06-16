import { productsURL } from "../constants";

export const deleteProductsById = async (id) => {
  const response = await fetch(`${productsURL}/${id}`, { method: "DELETE" });
  const product = await response.json();
  return product;
};
