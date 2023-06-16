import { createProductTableRow } from "../../components/productTableRow";
import { getProducts } from "../../api/getProducts";
import { deleteProductsById } from "../../api/deleteProductsById";

const tableBody = document.getElementById("products-table-body");

window.addEventListener("DOMContentLoaded", () => {
  let isLoading = true;

  const spinnerHTML = `<div>
		<img id="spinner" src="https://i.stack.imgur.com/hzk6C.gif" />
		</div>
		`;

  getProducts().then((products) => {
    isLoading = false;
    const tableRows = products
      .map((product) => createProductTableRow(product))
      .join("");
    tableBody.innerHTML = tableRows;
  });

  if (isLoading) {
    tableBody.innerHTML = spinnerHTML;
  }
});

tableBody.addEventListener("click", onClick);

async function onClick(e) {
  if (e.target.classList.contains("delete-product")) {
    const id = e.target.parentNode.parentNode.id.substring(1);
    e.target.parentNode.parentNode.remove();
    const response = await deleteProductsById(id);
    console.log(response);
  }
}
