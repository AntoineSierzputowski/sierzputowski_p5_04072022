// function call API pour recup kanap à appeler dans 2e function
const apiUrl = "http://localhost:3000/api/products/";

const getKanap = async () => {
  var kanaps = await fetch(apiUrl);
  console.log(kanaps);
  return kanaps.json();
};

const createCardHtml = async () => {
  console.log("function create card");
  await getKanap().then((kanap) => {
    for (let i = 0; i < kanap.length; i++) {
      // créer <a> + insérer à l'enfant de section
      const elemCard = `<a href="./product.html?id=${kanap[i]._id}">
    <article>
      <img src="${kanap[i].imageUrl}" alt="${kanap[i].altTxt}">
      <h3 class="productName">${kanap[i].name}</h3>
      <p class="productDescription">${kanap[i].description}</p>
    </article>
    </a>`;
      const elem = document.getElementById("items");
      elem.insertAdjacentHTML("beforeend", elemCard);
    }
  });
};

createCardHtml();
