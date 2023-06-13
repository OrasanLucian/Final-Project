import "./style.css";

export const createProductDetailsCard = (product) =>
  `<div class="details-card">
     <h4>${product.name}</h4>
     <img src=${product.image} />
     <h5>${product.price} $</h5>
     <a href="/src/pages/details/details.html?id=${product.id}">Details</a>
     <button class="add-to-cart-btn">Add to cart</button>
     <p>${product.description}</p>
   </div>`;
