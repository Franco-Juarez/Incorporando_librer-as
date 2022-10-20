import { productValidation } from "./src/actionCart.js";
import { getProduct } from "./src/getProduct.js";

//FUNCIÓN PARA RENDERIZAR LOS PRODUCTOS EN EL DOM A PARTIR DE UN ARRAY DE OBJETOS

const addCards = async () => {

    const productContainer = document.getElementById("productContainer");
    const productCollection = await getProduct();

    productCollection.forEach(product => {
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

        const buyProduct = () => {
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
        } 
        buyProduct();

        //FILTRO SOBRE EL ARRAY 

        const seleccion = document.getElementById("genres");
        document.getElementById("formFilter").onsubmit = (e) => {
            e.preventDefault();
            const productsCards = document.querySelectorAll('.card');
            productsCards.forEach(element => {
                element.remove();
            });
            const filteredProducts = productCollection.filter(item => item.genre === seleccion.value);

            filteredProducts.forEach(product =>  {
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
                // buyProduct();
                //NO SE CÓMO VOLVER A INVOCAR LA FUNCIONALIDAD PARA COMPRAR EL PRODUCTO SOBRE LOS NUEVOS RENDERIZADOS
            })
            
        }
    });
}

const deleteFilter = document.getElementById("deleteFilter");
        deleteFilter.addEventListener("click", () =>{
            const productsCards = document.querySelectorAll('.card');
            productsCards.forEach(element => {
                element.remove();
            });
            addCards();
        })

export { addCards };