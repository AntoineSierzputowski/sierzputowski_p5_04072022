const idProduct = new URL(window.location.href).searchParams.get("id");
const apiUrl = "http://localhost:3000/api/products/";

const getKanap = async () => {
  var kanap = await fetch(apiUrl + idProduct);
  return kanap.json();
};

// function pour créer la card et afficher les infos
let nameProduct = document.getElementById("title");
let priceProduct = document.getElementById("price");
let descProduct = document.getElementById("description");
let colorsProduct = document.getElementById("colors");
let imgProduct = document.querySelector(".item__img");
let img = document.createElement("img");
imgProduct.appendChild(img);

const createCard = async () => {
  await getKanap().then((kanap) => {
    img.setAttribute("src", kanap.imageUrl);
    img.setAttribute("alt", kanap.altTxt);
    nameProduct.innerHTML = kanap.name;
    priceProduct.innerHTML = kanap.price;
    descProduct.innerHTML = kanap.description;
    document.title = kanap.name;

    for (let i = 0; i < kanap.colors.length; i++) {
      let color = document.createElement("option");
      color.setAttribute("color", kanap.colors[i]);
      color.innerHTML = kanap.colors[i];
      colorsProduct.appendChild(color);
    }
  });
};
createCard();

// gerer redirection mauvais ID
