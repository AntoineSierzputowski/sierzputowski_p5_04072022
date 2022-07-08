let kanapList = JSON.parse(localStorage.getItem("cart"));

if (!kanapList) {
  const elemPanierVide = `<div style="display:flex; justify-content:center"><p style="font-size:40px; padding: 30px">Votre panier est vide</p> <img src="https://i.gifer.com/Wv5r.gif"/></div>`;
  const elem = document.querySelector("#cartAndFormContainer h1");
  elem.insertAdjacentHTML("afterend", elemPanierVide);
  document.querySelector(".cart").remove();
} else {
  for (let i = 0; i < kanapList.length; i++) {
    const panierCard = ` <article class="cart__item" data-id="{${kanapList[i].idKanap}}" data-color="{${kanapList[i].colorKanap}}">
    <div class="cart__item__img">
      <img src="${kanapList[i].imgKanap}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${kanapList[i].nameKanap}</h2>
        <p>${kanapList[i].colorKanap}</p>
        <p>${kanapList[i].priceKanap} €</p>
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
  }
}

{
}

// ----- update le cart

const deleteKanap = () => {
  alert("ok");
};

const deleteButton = document.querySelector(".deleteItem");
deleteButton.addEventListener("mousedown", deleteKanap);
