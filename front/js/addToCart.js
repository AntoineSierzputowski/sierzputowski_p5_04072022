// récupérer les valeurs id, quantité et couleurs
var colorSelected = document.getElementById("colors");

var number = document.getElementById("quantity"); // quantity
var titleProductPage = document.getElementById("title").innerText;

const addToCart = () => {
  let lsCart = localStorage.getItem("cart");
  if (lsCart == null) {
    let objJson = {
      id: idProduct,
      quantity: number.value,
      color: colorSelected.value,
    };
    var arr = [];
    arr.push(objJson);
    console.log(arr);

    localStorage.setItem("cart", JSON.stringify(arr));
  } else {
    let productFind = lsCart.find(
      (product) =>
        product.id === idProduct && product.color === colorSelected.value
    );
    if (productFind) {
      productFind.quantity += number.value;
    } else {
      let objJson = {
        id: idProduct,
        quantity: number.value,
        color: colorSelected.value,
      };
      lsCart.push(objJson);
      localStorage.setItem("cart", JSON.stringify(lsCart));
    }
  }
};

let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addToCart);
//
