import { createProductTableRow } from "../../components/productTableRow";
import { getProducts } from "../../api/getProducts";
import { deleteProductsById } from "../../api/deleteProductsById";
import { productsURL } from "../../constants";

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

const formAdmin = document.getElementById("form-admin");
const addProductButton = document.getElementById("add-new-product");
const addProductForm = document.getElementById("form-details");

addProductButton.addEventListener("click", () => {
  formAdmin.style.display = "block";
});

addProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const image = document.getElementById("image").value;
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const stock = document.getElementById("stock").value;
  const price = document.getElementById("price").value;

  const addProduct = async (productData) => {
    const response = await fetch(productsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const product = await response.json();
    return product;
  };

  const productData = {
    image,
    name,
    description,
    stock,
    price,
  };

  const response = await addProduct(productData);
  console.log(response);

  addProductForm.reset();

  formAdmin.style.display = "none";
});
