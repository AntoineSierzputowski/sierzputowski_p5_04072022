let kanapList = JSON.parse(localStorage.getItem("cart"));

if (!kanapList || kanapList.length == 0) {
  const elemPanierVide = `<div style="display:flex; justify-content:center"><p style="font-size:40px; padding: 30px">Votre panier est vide</p> <iframe src="https://giphy.com/embed/uLMwmBDrT7Y7JNiA8x" width="480" height="290" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/pushat-kanye-west-diet-coke-pusha-t-uLMwmBDrT7Y7JNiA8x">via GIPHY</a></p></div>`;
  const elem = document.querySelector("#cartAndFormContainer h1");
  elem.insertAdjacentHTML("afterend", elemPanierVide);
  document.querySelector(".cart").remove();
} else {
  let nbArticles = 0;
  const totalPrice = document.getElementById("totalPrice");
  totalPrice.innerHTML = "0";
  for (let i = 0; i < kanapList.length; i++) {
    nbArticles += kanapList[i].qtyKanap;
    fetch("http://localhost:3000/api/products/" + kanapList[i].idKanap)
      .then((response) => response.json())
      .then((data) => {
        const panierCard = ` <article class="cart__item" data-id="${kanapList[i].idKanap}" data-color="${kanapList[i].colorKanap}">
                <div class="cart__item__img">
                  <img src="${data.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${kanapList[i].colorKanap}</p>
                    <p id="price_p" data-id="price-${kanapList[i].idKanap}-${kanapList[i].colorKanap}">${data.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanapList[i].qtyKanap}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
        const elem = document.querySelector(".cart");
        elem.insertAdjacentHTML("afterbegin", panierCard);

        // mise à jour du prix total
        // ajouter le nombre d'articles total dans le DOM
        const totalPrice = document.getElementById("totalPrice");
        let actualTotalPrice = parseInt(totalPrice.innerHTML);
        totalPrice.innerHTML =
          actualTotalPrice + data.price * kanapList[i].qtyKanap;

        const deleteButton = document.querySelector(
          `.cart__item[data-id="${kanapList[i].idKanap}"][data-color="${kanapList[i].colorKanap}"] .deleteItem`
        );
        // remove article
        deleteButton.addEventListener("click", (e) => {
          e.preventDefault();
          const idKanapRemove = kanapList[i].idKanap;
          const colorKanapRemove = kanapList[i].colorKanap;
          let kanapListRemove = JSON.parse(localStorage.getItem("cart"));
          var kanapFilter = kanapListRemove.filter(
            (kanap) =>
              kanap.idKanap != idKanapRemove &&
              kanap.colorKanap != colorKanapRemove
          );
          localStorage.setItem("cart", JSON.stringify(kanapFilter));
          const elemToRemove = document.querySelector(
            `.cart__item[data-id="${kanapList[i].idKanap}"][data-color="${kanapList[i].colorKanap}"]`
          );
          elemToRemove.remove();
          // update prix -------
          location.reload();
        });
        // ------
        const elInput = document.querySelector(
          `.cart__item[data-id="${kanapList[i].idKanap}"][data-color="${kanapList[i].colorKanap}"] .itemQuantity`
        );
        const price_k_p = parseInt(
          document.getElementById("price_p").textContent.slice(0, -1)
        );

        const price_k_base = parseInt(elInput.value) * price_k_p;
        const priceTotal = parseInt(
          document.getElementById("totalPrice").textContent
        );
        // quantité d'article au chargement de la page
        elInput.addEventListener("input", (e) => {
          e.preventDefault();
          let qtyIrt = elInput.value;
          const KanapId = kanapList[i].idKanap;
          var kanapFilter = kanapList.filter(
            (kanap) => kanap.idKanap == KanapId
          );
          kanapFilter[0].qtyKanap = qtyIrt;
          localStorage.setItem("cart", JSON.stringify(kanapList));
          // -------------

          // calculer nouveau montant du panier qu'on touche --> price * qty
          let total = 0;
          for (let i = 0; i < kanapList.length; i++) {
            fetch("http://localhost:3000/api/products/" + kanapList[i].idKanap)
              .then((response) => response.json())
              .then((data) => {
                total += data.price * kanapList[i].qtyKanap;
                console.log("prix totzl:", total); // pq retourne 2 valeurs ?
                totalPrice.innerHTML = total;
              });
          }
        });
      });
  }
}

{
}

// ----- update le cart

// formulaire
// ------------------------------------

// function error ------------------------------------
const errorPrenom = () => {
  const errorMsgPrenom = document.getElementById("firstNameErrorMsg");
  errorMsgPrenom.innerHTML = "Erreur de saisie";
};
const errorNom = () => {
  const errorMsgNom = document.getElementById("lastNameErrorMsg");
  errorMsgNom.innerHTML = "Erreur de saisie";
};
const errorAdress = () => {
  const errorMsgAdress = document.getElementById("addressErrorMsg");
  errorMsgAdress.innerHTML = "Erreur de saisie";
};
const errorVille = () => {
  const errorMsgVille = document.getElementById("cityErrorMsg");
  errorMsgVille.innerHTML = "Erreur de saisie";
};
const errorEmail = () => {
  const errorMsgEmail = document.getElementById("emailErrorMsg");
  errorMsgEmail.innerHTML = "Erreur de saisie";
};

// function POST

const postRequest = () => {
  let form = document.querySelector(".cart__order__form");
  let prenom = form.firstName.value;
  let nom = form.lastName.value;
  let adresse = form.address.value;
  let ville = form.city.value;
  var email = form.email.value;

  var contact = {
    firstName: prenom,
    lastName: nom,
    address: adresse,
    city: ville,
    email: email,
  };

  var products = [];
  for (let i = 0; i < kanapList.length; i++) {
    var id = kanapList[i].idKanap;
    products.push(id);
  }

  var body = {
    contact: contact,
    products: products,
  };

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("orderId", data.orderId);
      document.location.href = "confirmation.html?id=" + data.orderId;
    })

    .catch((error) => {
      console.log(error);
    });
};

const postForm = () => {
  // value input
  let form = document.querySelector(".cart__order__form");
  let prenom = form.firstName.value;
  let nom = form.lastName.value;
  let adresse = form.address.value;
  let ville = form.city.value;
  var email = form.email.value;

  // regex
  let emailRegex = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let classicRegex = new RegExp("^[a-zA-Z ,.'-]+$");

  let adresseRegex = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  var emailValid = emailRegex.test(email);
  var prenomValid = classicRegex.test(prenom);
  var nomValid = classicRegex.test(nom);
  var villeValid = classicRegex.test(ville);
  var adresseValid = adresseRegex.test(adresse);
  if (emailValid && prenomValid && nomValid && villeValid && adresseValid) {
    postRequest();
  } else {
    if (!emailValid) {
      errorEmail();
    }
    if (!prenomValid) {
      errorPrenom();
    }
    if (!nomValid) {
      errorNom();
    }
    if (!villeValid) {
      errorVille();
    }
    if (!adresseValid) {
      errorAdress();
    }
  }
};

const order = document.getElementById("order");
order.addEventListener("click", (e) => {
  e.preventDefault();
  postForm();
});
