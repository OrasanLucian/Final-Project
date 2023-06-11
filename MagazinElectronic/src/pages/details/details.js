import { getProductsById } from "../../api/getProductsById";
import { createProductDetailsCard } from "../../components/productDetailsCard";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

const product = await getProductsById(productId);

document.getElementById("details-card").innerHTML =
  createProductDetailsCard(product);
