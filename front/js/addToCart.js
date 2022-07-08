function addToCart() {
  const colorChoice = document.querySelector("#colors");
  const quantityChoice = document.querySelector("#quantity");

  // checker couleur + nombre
  if (
    quantityChoice.value > 0 &&
    quantityChoice.value <= 100 &&
    colorChoice.value != ""
  ) {
    // checker si deja des articles dans le panier
    if (localStorage.getItem("cart")) {
      let productCart = JSON.parse(localStorage.getItem("cart"));

      let idKanap = idProduct;
      let colorKanap = document.querySelector("#colors").value;
      let qtyKanap = document.querySelector("#quantity").value;

      // find renvoie le kanap qui a similaire qui les memes couleurs
      const resultFind = productCart.find(
        (el) => el.idKanap === idProduct && el.colorKanap === colorKanap
      );

      // si find retourne un kanap --> convertit en number et on additionne
      if (resultFind) {
        let newQuantite = parseInt(qtyKanap) + parseInt(resultFind.qtyKanap);
        resultFind.qtyKanap = newQuantite;
        localStorage.setItem("cart", JSON.stringify(productCart));
      }

      // si find retourne rien --> on rajoute le kanap dans le ls
      else {
        let productCart = JSON.parse(localStorage.getItem("cart"));

        let idKanap = idProduct;
        let nameKanap = document.querySelector("#title").textContent;
        let colorKanap = document.querySelector("#colors").value;
        let qtyKanap = document.querySelector("#quantity").value;
        let imgKanap = img.src;
        let altImg = img.alt;
        let priceKanap = document.querySelector("#price").textContent;

        let productCartObj = {
          idKanap: idProduct,
          nameKanap: nameKanap,
          colorKanap: colorKanap,
          qtyKanap: qtyKanap,
          imgKanap: imgKanap,
          altImg: altImg,
          priceKanap: priceKanap,
        };

        productCart.push(productCartObj);

        let objCart = JSON.stringify(productCart);
        localStorage.setItem("cart", objCart);
      }
    }
    // si ls est vide --> on rajoute le kanap dans le ls
    else {
      let productCart = [];

      let idKanap = idProduct;
      let nameKanap = document.querySelector("#title").textContent;
      let colorKanap = document.querySelector("#colors").value;
      let qtyKanap = document.querySelector("#quantity").value;
      let imgKanap = img.src;
      let altImg = img.alt;
      let priceKanap = document.querySelector("#price").textContent;

      let productCartObj = {
        idKanap: idProduct,
        nameKanap: nameKanap,
        colorKanap: colorKanap,
        qtyKanap: qtyKanap,
        imgKanap: imgKanap,
        altImg: altImg,
        priceKanap: priceKanap,
      };

      productCart.push(productCartObj);

      let objCart = JSON.stringify(productCart);
      localStorage.setItem("cart", objCart);
    }
  }
}

let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addToCart);
