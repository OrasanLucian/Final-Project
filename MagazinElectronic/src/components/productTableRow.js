import "./style.css";

export const createProductTableRow = (product) => `
   <tr id="p${product.id}">
      <td id="product-name">${product.name}</td>
      <td><img id="products" src=${product.image} /></td>
      <td>${product.price} $</td>
      <td>${product.stock}</td>
      <td><button class='delete-product'>Remove</button></td>
   </tr>
`;
