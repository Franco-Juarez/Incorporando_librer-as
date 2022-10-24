import { productValidation } from "./src/actionCart.js";
import { getProduct } from "./src/getProduct.js";

const productContainer = document.getElementById("productContainer");
const seleccion = document.getElementById("genres");
let productos = [];

getProduct().then(array => array.forEach(e => productos.push(e)));

//FUNCIÓN PARA RENDERIZAR LOS PRODUCTOS EN EL DOM A PARTIR DE UN ARRAY DE OBJETOS
const addCards = (array) => {
    array.forEach(product => {
        const article = document.createElement('article');
        article.innerHTML += `
                            <div class="card">
                            <img src=${product.img} class="card-img-top" alt=${product.alt} >
                            <div class="card-body">
                            <h5 class="card-title">${product.name} </h5>
                            <p class="card-text">${product.desc} </p>
                            <button href="#" class="btn btn-primary" id=btn${product.idProduct}>Comprar</button>
                            </div>
                            </div>
                            `
        productContainer.appendChild(article);

        const btnBuy = document.getElementById(`btn${product.idProduct}`);

        btnBuy.addEventListener('click', () => {
            productValidation(product.idProduct);
            Toastify({
                text: `Has agregado ${product.name} al carrito`,
                duration: 1500,
                style: {
                    background: "linear-gradient(to right, #ffb347, #ffcc33)",
                },
            }).showToast();
        })
    });
}

//FILTRO SOBRE EL ARRAY
document.getElementById("formFilter").onsubmit = (e) => {
    e.preventDefault();
    productContainer.innerHTML = '';
    const filteredProducts = productos.filter(item => item.genre === seleccion.value);
    addCards(filteredProducts);
}

const deleteFilter = document.getElementById("deleteFilter");

deleteFilter.addEventListener("click", () => {
    productContainer.innerHTML = '';
    addCards(productos);
})

export { addCards };