import "./style.css";
import { getProducts } from "./src/api/getProducts";
import { createProductCard } from "./src/components/productCard";

window.addEventListener("DOMContentLoaded", () => {
  let isLoading = true;

  const spinnerHTML = `<div>
		<img id="spinner" src="https://i.stack.imgur.com/hzk6C.gif" />
		</div>
		`;

  const productsContainer = document.getElementById("products");

  getProducts().then((products) => {
    isLoading = false;
    const productHTML = products
      .map((product) => createProductCard(product))
      .join("");
    productsContainer.innerHTML = productHTML;
  });

  if (isLoading) {
    productsContainer.innerHTML = spinnerHTML;
  }
});
