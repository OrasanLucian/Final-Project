import "./style.css";

export const createProductCard = (product) =>
  `<div class="card">
     <h4>${product.name}</h4>
     <img src=${product.image} />
     <h5>${product.price} $</h5>
     <a href="/src/pages/details?id=${product.id}">Details</a>
   </div>`;
