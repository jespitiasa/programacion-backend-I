const socket = io();

// Función para renderizar productos
const renderProducts = (productos) => {
  const productosList = document.getElementById("productos-list");
  productosList.innerHTML = "";

  productos.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = product.id;

    const cardImg = document.createElement("div");
    cardImg.className = "card-img";
    const img = document.createElement("img");
    img.src = product.thumbnail;
    img.alt = "";
    cardImg.appendChild(img);

    const cardInfo = document.createElement("div");
    cardInfo.className = "card-info";
    const title = document.createElement("p");
    title.className = "text-title";
    title.textContent = product.title;
    const body = document.createElement("p");
    body.className = "text-body";
    body.textContent = product.description;
    cardInfo.appendChild(title);
    cardInfo.appendChild(body);

    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";
    const price = document.createElement("span");
    price.className = "text-title";
    price.textContent = product.price;

    cardFooter.appendChild(price);
    card.appendChild(cardImg);
    card.appendChild(cardInfo);
    card.appendChild(cardFooter);
    productosList.appendChild(card);
  });
};

// Escuchar eventos de productos
socket.on("products", (productos) => {
  renderProducts(productos);
});

// Añadir producto mediante formulario
document.getElementById("addProductForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const product = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      code: document.getElementById("code").value,
      price: document.getElementById("price").value,
      status: true,
      stock: document.getElementById("stock").value,
      category: document.getElementById("category").value,
      thumbnail: document.getElementById("thumbnail").value,
      id: 0,
    };
    socket.emit("addProduct", product);
    // Limpiar formulario
    document.getElementById("addProductForm").reset();
  });

// Eliminar producto mediante formulario
document.getElementById("deleteProductForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const productId = document.getElementById("productId").value;
    socket.emit("deleteProduct", productId);
  });