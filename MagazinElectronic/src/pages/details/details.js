import { getProductsById } from "../../api/getProductsById";
import { createProductDetailsCard } from "../../components/productDetailsCard";
import { addProductToCart } from "../../utils/cart";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

window.addEventListener("load", async () => {
  const product = await getProductsById(productId);

  document.getElementById("details-card").innerHTML =
    createProductDetailsCard(product);
});

document.getElementById("details-card").addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    addProductToCart(productId);
  }
});
