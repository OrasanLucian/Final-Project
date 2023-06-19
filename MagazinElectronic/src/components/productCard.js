import "./style.css";

export const createProductCard = (product) =>
  `<div class="card">
     <h4>${product.name}</h4>
     <img src=${product.image} />
     <h5>Price: ${product.price.toFixed(2)} $</h5>
     <a href="/src/pages/details/details.html?id=${product.id}">Details</a>
   </div>`;
