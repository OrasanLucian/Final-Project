import { getProductsById } from "../../api/getProductsById";
import {
  decrementProductQuantity,
  incrementProductQuantity,
  getProductQuantityFromLocalStorage,
  isProductAlreadyInCart,
} from "../../utils/cart";

const showProducts = async () => {
  const cart = localStorage.getItem("cart");
  const products = JSON.parse(cart);
  document.getElementById("cart").innerHTML = "";
  products.forEach((product) => {
    getProductsById(product.id).then(
      (productInfo) =>
        (document.getElementById("cart").innerHTML += `<div id="p${product.id}">
        <span>${productInfo.name}</span>
        <span>Price: ${productInfo.price} $</span>
        <img src=${productInfo.image} />
        <button id=${product.id} class="decrement-quantity">-</button>
        <span>Quantity: ${product.quantity}</span>
        <button id=${product.id} class="increment-quantity">+</button>
        </div>`)
    );
  });
};

window.addEventListener("load", showProducts);

document.getElementById("cart").addEventListener("click", async (e) => {
  const cartArray = JSON.parse(localStorage.getItem("cart"));
  const productId = e.target.id;

  if (e.target.classList.contains("decrement-quantity")) {
    decrementProductQuantity(productId, cartArray);
  } else if (e.target.classList.contains("increment-quantity")) {
    incrementProductQuantity(productId, cartArray);
  }

  localStorage.setItem("cart", JSON.stringify(cartArray));

  if (!isProductAlreadyInCart(productId, cartArray)) {
    document
      .getElementById("cart")
      .querySelector("#p" + productId)
      .remove();
  } else {
    document
      .getElementById("cart")
      .querySelector("#p" + productId)
      .querySelector(".quantity").innerHTML =
      getProductQuantityFromLocalStorage(productId, cartArray);
  }
});
