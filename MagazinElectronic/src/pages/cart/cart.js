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
  const sortedProducts = products.sort((a, b) => a.id - b.id);

  document.getElementById("cart").innerHTML = "";
  let totalSum = 0;

  for (const product of sortedProducts) {
    const productInfo = await getProductsById(product.id);
    const totalPrice = productInfo.price * product.quantity;
    totalSum += totalPrice;
    document.getElementById("cart").innerHTML += `<tr id="p${product.id}">
        <td id="product-name"><a href="/src/pages/details/details.html?id=${
          product.id
        }">${productInfo.name}</a></td>
        <td><img id="products" src=${productInfo.image} /></td>
        <td>${productInfo.price} $</td>
        <td><button id=${
          product.id
        } class="decrement-quantity">-</button> <span class="quantity">${
      product.quantity
    }</span> <button id=${product.id} class="increment-quantity">+</button></td>
        <td class="subtotal">${totalPrice.toFixed(2)} $</td>
        <td><button class='remove-product'>Remove</button></td>
        </tr>`;
  }
  updateTotalSum(sortedProducts);
};

const updateTotalSum = async (cartArray) => {
  let totalSum = 0;

  const productPromises = cartArray.map((product) => {
    return getProductsById(product.id).then((productInfo) => {
      const totalPrice = productInfo.price * product.quantity;
      totalSum += totalPrice;
    });
  });

  await Promise.all(productPromises);

  document.getElementById("total-price").innerHTML =
    "TOTAL PRICE: " + totalSum.toFixed(2) + " " + "$";
};

window.addEventListener("load", showProducts);

document.getElementById("cart").addEventListener("click", async (e) => {
  const cartArray = JSON.parse(localStorage.getItem("cart"));
  const productId = e.target.id;

  if (e.target.classList.contains("decrement-quantity")) {
    decrementProductQuantity(productId, cartArray);
    updateTotalSum(cartArray);
  } else if (e.target.classList.contains("increment-quantity")) {
    incrementProductQuantity(productId, cartArray);
    updateTotalSum(cartArray);
  } else if (e.target.classList.contains("remove-product")) {
    var buttonClicked = e.target;
    buttonClicked.parentElement.parentElement.remove();
    localStorage.removeItem(cartArray.splice(cartArray.indexOf(productId), 1));
    updateTotalSum(cartArray);
  }

  localStorage.setItem("cart", JSON.stringify(cartArray));

  if (!isProductAlreadyInCart(productId, cartArray)) {
    const elementToRemove = document
      .getElementById("cart")
      .querySelector("#p" + productId);
    if (elementToRemove) {
      elementToRemove.remove();
    }
  } else {
    const productRow = document.getElementById("p" + productId);
    const productQuantityElement = productRow.querySelector(".quantity");
    const productQuantity = getProductQuantityFromLocalStorage(
      productId,
      cartArray
    );
    productQuantityElement.innerHTML = productQuantity;

    const productInfo = await getProductsById(productId);
    const totalPrice = productInfo.price * productQuantity;
    productRow.querySelector("td.subtotal").innerHTML =
      totalPrice.toFixed(2) + " $";

    updateTotalSum(cartArray);
  }
});

const validationMessage = document.getElementById("message");
const buyButton = document.getElementById("buy");
buyButton.addEventListener("click", onBuyFinishOrder);
function onBuyFinishOrder() {
  validationMessage.style.backgroundColor = "greenyellow";
  document.getElementById("message").innerHTML = "Thank you for your purchase";
  setTimeout(function () {
    validationMessage.style.backgroundColor = "";
    localStorage.clear();
    location.reload();
    document.getElementById("message").innerHTML = "";
  }, 3000);
}
