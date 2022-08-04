console.log("producttest file");

const idProduct = new URL(window.location.href).searchParams.get("id");
const apiUrl = "http://localhost:3000/api/products/";

let titleProduct = document.getElementById("title");
let priceProduct = document.getElementById("price");
let descriptionProduct = document.getElementById("description");
let colorsProduct = document.getElementById("colors");
let imgProduct = document.querySelector(".item__img");
let img = document.createElement("img");
imgProduct.appendChild(img);

async function getKanap() {
  await fetch(apiUrl + idProduct)
    .then((product) => product.json())
    .then((product) => {
      img.setAttribute("src", product.imageUrl);
      img.setAttribute("alt", product.altTxt);
      titleProduct.innerHTML = product.name;
      priceProduct.innerHTML = product.price;
      descriptionProduct.innerHTML = product.description;
      document.title = product.name;

      for (let i = 0; i < product.colors.length; i++) {
        let color = document.createElement("option");
        color.setAttribute("value", product.colors[i]);
        color.innerHTML = product.colors[i];
        colorsProduct.appendChild(color);
      }
    })
    .catch((error) => {
      console.log(error);
      const article = document.querySelector("article");
      article.remove();
      function errorimg() {
        window.location.href = "./index.html";
      }
      errorimg();
    });
}
getKanap();
// gerer redirection mauvais ID
