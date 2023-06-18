import "./style.css";

export const createProductDetailsCard = (product) =>
  `<div class="details-card">
     <img src=${product.image} />
     <div id="product-info">
       <h1>${product.name}</h1>
       <h2>Price: ${product.price.toFixed(2)} $</h2>
       <button class="add-to-cart-btn">Add to cart</button>
       <a href="/src/pages/details/details.html?id=${product.id}">Details</a>
       <p>${product.description}</p>
       <p>In stock: ${product.stock}</p>
     </div>
   </div>`;
