import "./style.css";

export const createProductDetailsCard = (product) =>
  `<div class="details-card">
     <h1>${product.name}</h1>
     <img src=${product.image} />
     <h2>${product.price} $</h2>
     <button class="add-to-cart-btn">Add to cart</button>
     <a href="/src/pages/details/details.html?id=${product.id}">Details</a>
     <p>${product.description}</p>
   </div>`;
