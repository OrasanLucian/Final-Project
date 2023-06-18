import "./style.css";

export const createProductCard = (product) =>
  `<div class="card">
     <h4>${product.name}</h4>
     <img src=${product.image} />
     <h5>Price: ${product.price} $</h5>
     <div>
       <button><a href="/src/pages/details/details.html?id=${product.id}">Details</a></button>
       <button class="add-to-cart-btn">Add to cart</button>
     </div>
   </div>`;
