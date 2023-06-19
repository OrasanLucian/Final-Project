import "./style.css";

export const createProductTableRow = (product) => `
   <tr id="p${product.id}">
      <td id="product-name"><a href="/src/pages/details/details.html?id=${
        product.id
      }">${product.name}</a></td>
      <td><img id="products" src=${product.image} /></td>
      <td>${product.price.toFixed(2)} $</td>
      <td>${product.stock}</td>
      <td><button class='delete-product'>Remove</button></td>
   </tr>
`;
