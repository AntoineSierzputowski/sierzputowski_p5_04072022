let kanapList = JSON.parse(localStorage.getItem("cart"));

if (!kanapList) {
  const elemPanierVide = `<div style="display:flex; justify-content:center"><p style="font-size:40px; padding: 30px">Votre panier est vide</p> <img src="https://nitter.net/pic/ext_tw_video_thumb%2F1491200678936592388%2Fpu%2Fimg%2F24grblv5PvgI9BI5.jpg"/></div>`;
  const elem = document.querySelector("#cartAndFormContainer h1");
  elem.insertAdjacentHTML("afterend", elemPanierVide);
  document.querySelector(".cart").remove();
} else {
  for (let i = 0; i < kanapList.length; i++) {
    fetch("http://localhost:3000/api/products/" + kanapList[i].idKanap)
      .then((response) => response.json())
      .then((data) => {
        const panierCard = ` <article class="cart__item" data-id="{${kanapList[i].idKanap}}" data-color="{${kanapList[i].colorKanap}}">
        <div class="cart__item__img">
          <img src="${data.imageUrl}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${data.name}</h2>
            <p>${kanapList[i].colorKanap}</p>
            <p>${data.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté :${kanapList[i].qtyKanap} </p>
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
      });
  }
}

{
}

// ----- update le cart
document.addEventListener("DOMContentLoaded", () => {
  console.log("dom loaded");
  const deleteFunction = () => {
    function displayDate() {
      alert("ok !");
    }
    let deleteButton = document.querySelectorAll(
      ".cart__item__content__settings__delete p"
    )[0];
    deleteButton.addEventListener("click", displayDate);
  };
  deleteFunction();
});

// formulaire
// ------------------------------------

// function error ------------------------------------
const errorPrenom = () => {
  console.log("errorPrenom !!!");
  const errorMsgPrenom = document.getElementById("firstNameErrorMsg");
  errorMsgPrenom.innerHTML = "Erreur de saisie";
};
const errorNom = () => {
  console.log("errorNom !!!");
  const errorMsgNom = document.getElementById("lastNameErrorMsg");
  errorMsgNom.innerHTML = "Erreur de saisie";
};
const errorAdress = () => {
  console.log("errorAdress !!!");
  const errorMsgAdress = document.getElementById("addressErrorMsg");
  errorMsgAdress.innerHTML = "Erreur de saisie";
};
const errorVille = () => {
  console.log("errorVille !!!");
  const errorMsgVille = document.getElementById("cityErrorMsg");
  errorMsgVille.innerHTML = "Erreur de saisie";
};
const errorEmail = () => {
  console.log("errorEmail !!!");
  const errorMsgEmail = document.getElementById("emailErrorMsg");
  errorMsgEmail.innerHTML = "Erreur de saisie";
};

// function POST

const postRequest = () => {
  console.log("postREquest //:");
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

  var products = JSON.parse(localStorage.getItem("cart"));

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(contact),
    products,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => {
      console.log("FETCH OK");
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
  if (
    emailRegex.test(email) &&
    classicRegex.test(prenom) &&
    classicRegex.test(nom) &&
    classicRegex.test(ville) &&
    adresseRegex.test(adresse)
  ) {
    postRequest();
  } else {
    if (!emailRegex.test(email)) {
      errorEmail();
    }
    if (!classicRegex.test(prenom)) {
      errorPrenom();
    }
    if (!classicRegex.test(nom)) {
      errorNom();
    }
    if (!classicRegex.test(ville)) {
      errorVille();
    }
    if (!adresseRegex.test(adresse)) {
      errorAdress();
    }
  }
};

const order = document.getElementById("order");
order.addEventListener("click", (e) => {
  e.preventDefault();
  postForm();
});

// -------------------------------------------
// -------------------------------------------
