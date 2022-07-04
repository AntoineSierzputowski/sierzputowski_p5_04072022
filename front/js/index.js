// function call API pour recup kanap à appeler dans 2e function
const apiUrl = "http://localhost:3000/api/products/";

const getKanap = async () => {
  var kanaps = await fetch(apiUrl);
  console.log(kanaps);
  return kanaps.json();
};

// function pour créer la card et afficher les infos
const createCard = async () => {
  console.log("function create card");
  await getKanap().then((kanap) => {
    for (let i = 0; i < kanap.length; i++) {
      // créer <a> + insérer à l'enfant de section
      let card = document.createElement("a");
      document.getElementById("items").appendChild(card);
      card.href = `product.html?id=${kanap[i]._id}`;

      // créer <article>
      let kanapBody = document.createElement("article");
      card.appendChild(kanapBody);

      // créer <img>
      let kanapImg = document.createElement("img");
      kanapBody.appendChild(kanapImg);
      kanapImg.src = kanap[i].imageUrl;
      kanapImg.alt = kanap[i].altTxt;

      // créer <h3>
      let kanapTitle = document.createElement("h3");
      kanapBody.appendChild(kanapTitle);
      kanapTitle.classList.add("kanapTitle");
      kanapTitle.innerHTML = kanap[i].name;

      // créer <p>
      let kanapDesc = document.createElement("p");
      kanapBody.appendChild(kanapDesc);
      kanapDesc.classList.add("kanapTitle");
      kanapDesc.innerHTML = kanap[i].description;
    }
  });
};

createCard();
