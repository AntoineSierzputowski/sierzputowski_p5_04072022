let kanapList = JSON.parse(localStorage.getItem('cart'));

if (!kanapList) {
    const elemPanierVide = `<div style="display:flex; justify-content:center"><p style="font-size:40px; padding: 30px">Votre panier est vide</p> <img src="https://nitter.net/pic/ext_tw_video_thumb%2F1491200678936592388%2Fpu%2Fimg%2F24grblv5PvgI9BI5.jpg"/></div>`;
    const elem = document.querySelector('#cartAndFormContainer h1');
    elem.insertAdjacentHTML('afterend', elemPanierVide);
    document.querySelector('.cart').remove();
} else {
    for (let i = 0; i < kanapList.length; i++) {
        fetch('http://localhost:3000/api/products/' + kanapList[i].idKanap)
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
                const elem = document.querySelector('.cart');
                elem.insertAdjacentHTML('afterbegin', panierCard);
                const deleteButton = document.querySelector(`.cart__item[data-id="${kanapList[i].idKanap}"][data-color="${kanapList[i].colorKanap}"] .deleteItem`);
                deleteButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    const idKanapRemove = kanapList[i].idKanap;
                    const colorKanapRemove = kanapList[i].colorKanap;
                    let kanapListRemove = JSON.parse(localStorage.getItem('cart'));
                    var kanapFilter = kanapListRemove.filter((kanap) => kanap.idKanap != idKanapRemove && kanap.colorKanap != colorKanapRemove);
                    localStorage.setItem('cart', JSON.stringify(kanapFilter));
                    const elemToRemove = document.querySelector(`.cart__item[data-id="${kanapList[i].idKanap}"][data-color="${kanapList[i].colorKanap}"]`);
                    elemToRemove.remove();
                });
                const el = document.querySelector(`.cart__item[data-id="${kanapList[i].idKanap}"][data-color="${kanapList[i].colorKanap}"] .itemQuantity`);
                el.addEventListener('input', (e) => {
                    e.preventDefault();
                    let qtyIrt = el.value;
                    const KanapId = kanapList[i].idKanap;
                    //   const KanapQty = kanapList[i].qtyKanap;
                    console.log('qsd:', kanapList);
                    var kanapFilter = kanapList.filter((kanap) => kanap.idKanap == KanapId);
                    kanapFilter[0].qtyKanap == qtyIrt;
                    // changer la valeur du LS
                    console.log('oo', kanapFilter[0].qtyKanap);
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
    const errorMsgPrenom = document.getElementById('firstNameErrorMsg');
    errorMsgPrenom.innerHTML = 'Erreur de saisie';
};
const errorNom = () => {
    const errorMsgNom = document.getElementById('lastNameErrorMsg');
    errorMsgNom.innerHTML = 'Erreur de saisie';
};
const errorAdress = () => {
    const errorMsgAdress = document.getElementById('addressErrorMsg');
    errorMsgAdress.innerHTML = 'Erreur de saisie';
};
const errorVille = () => {
    const errorMsgVille = document.getElementById('cityErrorMsg');
    errorMsgVille.innerHTML = 'Erreur de saisie';
};
const errorEmail = () => {
    const errorMsgEmail = document.getElementById('emailErrorMsg');
    errorMsgEmail.innerHTML = 'Erreur de saisie';
};

// function POST

const postRequest = () => {
    let form = document.querySelector('.cart__order__form');
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

    var products = JSON.parse(localStorage.getItem('cart'));

    fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        body: JSON.stringify(contact),
        products,
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())

        .catch((error) => {
            console.log(error);
        });
};

const postForm = () => {
    // value input
    let form = document.querySelector('.cart__order__form');
    let prenom = form.firstName.value;
    let nom = form.lastName.value;
    let adresse = form.address.value;
    let ville = form.city.value;
    var email = form.email.value;

    // regex
    let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let classicRegex = new RegExp("^[a-zA-Z ,.'-]+$");

    let adresseRegex = new RegExp('^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+');

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

const order = document.getElementById('order');
order.addEventListener('click', (e) => {
    e.preventDefault();
    postForm();
});

// ----- TOTAL ---------
const totalArticles = document.getElementById('totalQuantity');
totalArticles.innerHTML = kanapList.length;

const totalPrice = document.getElementById('totalPrice');
let priceT = kanapList.map((item) => {
    return parseInt(item.priceKanap, 10);
});

let quantityT = kanapList.map((item) => {
    return parseInt(item.qtyKanap, 10);
});
const totalNumber = priceT.reduce((a, value) => {
    return a + value;
}, 0);

totalPrice.innerHTML = totalNumber;

for (let i = 0; i < kanapList.length; i++) {
    var qtyNumber = parseInt(kanapList[i].qtyKanap);
    var priceN = parseInt(kanapList[i].priceKanap);
    var totalT = priceN * qtyNumber;
}
