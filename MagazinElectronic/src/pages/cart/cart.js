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
        (document.getElementById("cart").innerHTML += `<tr id="p${product.id}">
        <td id="product-name">${productInfo.name}</td>
        <td><img id="products" src=${productInfo.image} /></td>
        <td>${productInfo.price} $</td>
        <td><button id=${product.id} class="decrement-quantity">-</button> ${product.quantity} <button id=${product.id} class="increment-quantity">+</button></td>
        <td></td>
        <td><button class='remove-product'>Remove</button></td>
        </tr>`)
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
