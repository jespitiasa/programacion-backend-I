const socket = io();

const contenedorProductos = document.querySelector(".products-container");

socket.on("home", (data) => {
    contenedorProductos.innerHTML = "";
    data.forEach((product) => {
        const div = document.createElement("div");
        div.classList.add(`${product.id}`, cart);

        const title = document.createElement("p");
        title.innerText = product.title;
        const description = document.createElement("p");
        description.innerText = product.description;
        const code = document.createElement("p");
        code.innerText = product.code;
        const price = document.createElement("p");
        price.innerText = "$" + product.price;
        const stock = document.createElement("p");
        stock.innerText = document.createElement ("p");
        const category = document.createElement("p");
        category.innerText = document.createElement ("p");
        


        div.appendChild(title);
        div.appendChild(description);
        div.appendChild(price);
        contenedorProductos.appendChild(div);
    });
});