//Instauration formulaire avec regex
function getForm() {
  // Selectionner le form
  let form = document.querySelector(".cart__order__form");

  // regex
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  // Ecoute de la modification du prénom
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  // Ecoute de la modification du prénom
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  // Ecoute de la modification du prénom
  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  // Ecoute de la modification du prénom
  form.city.addEventListener("change", function () {
    validCity(this);
  });

  // Ecoute de la modification du prénom
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  //validation du prénom
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation du nom
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de la ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de l'email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    }
  };
}
getForm();

function postForm() {
  const order = document.getElementById("order");
  order.addEventListener("click", (event) => {
    event.preventDefault();

    // je récupère les données du formulaire dans un objet
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };
    console.log(contact);

    //Construction d'un array d'id depuis le local storage
    let products = [];
    for (let i = 0; i < productLocalStorage.length; i++) {
      products.push(productLocalStorage[i].idKanap);
    }
    console.log(products);

    // je mets les valeurs du formulaire et les produits sélectionnés
    // dans un objet...
    const sendFormData = {
      contact,
      products,
    };

    // j'envoie le formulaire + localStorage (sendFormData)
    // ... que j'envoie au serveur

    const options = {
      method: "POST",
      body: JSON.stringify(sendFormData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("orderId", data.orderId);
        document.location.href = "confirmation.html?id=" + data.orderId;
      });
  }); // fin eventListener postForm
} // fin envoi du formulaire postForm
postForm();

// -------
const myForm = document.querySelector(".cart__order__form");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("http://localhost:3000/api/products/order", {
    method: "post",
    body: formData,
  })
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      console.log("RESPONSE:" + response);
    })
    .catch((error) => {
      console.log("ERROR:" + error);
    });
});
// ----------------------------
const el = document.querySelector(
  `.cart__item[data-id="${kanapList[i].idKanap}"][data-color="${kanapList[i].colorKanap}"] .itemQuantity`
);
el.addEventListener("input", (e) => {
  e.preventDefault();
  let qtyIrt = el.value;
  const KanapId = kanapList[i].idKanap;
  //   const KanapQty = kanapList[i].qtyKanap;
  console.log("qsd:", kanapList);
  var kanapFilter = kanapList.filter((kanap) => kanap.idKanap == KanapId);
  let qtyBeforeModif = kanapFilter[0].qtyKanap;
  kanapFilter[0].qtyKanap = qtyIrt;
  // changer la valeur du LS

  localStorage.setItem("cart", kanapList);

  // je recupere mon article du DOM

  const priceElement = document.querySelector(
    `span[data-id="price-${kanapList[i].idKanap}-${kanapList[i].colorKanap}"]`
  );
  let price = parseInt(priceElement.innerHTML);

  const totalPrice = document.getElementById("totalPrice");
  let totalPriceBeforeModif = parseInt(totalPrice.innerHTML);

  let newTotalPrice =
    totalPriceBeforeModif - price * qtyBeforeModif + price * qtyIrt;
  totalPrice.innerHTML = newTotalPrice;
});

let new_price_k = qtyIrt * price_k_p;
document.getElementById("totalPrice").innerHTML =
  priceTotal - price_k_base + new_price_k;

// Insert your code here

// -------
