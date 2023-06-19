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
  const searchInput = document.getElementById("search-input");
  let products = [];

  const showProducts = () => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );

    const productHTML = filteredProducts
      .map((product) => createProductCard(product))
      .join("");
    productsContainer.innerHTML = productHTML;
  };

  getProducts().then((data) => {
    isLoading = false;
    products = data;
    showProducts();

    searchInput.addEventListener("input", showProducts);
  });

  if (isLoading) {
    productsContainer.innerHTML = spinnerHTML;
  }
});
