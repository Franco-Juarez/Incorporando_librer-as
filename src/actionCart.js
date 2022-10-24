import { getProduct } from "./getProduct.js";
import { getShoppingCart } from "./storage.js";
import { updateTotalCart } from "./updateCart.js";

let shoppingCart = [];


// VALIDACIÓN PARA DEFINIR SI UN PRODUCTO ESTÁ REPETIDO EN EL ARRAY SHOPPING-CART
const productValidation = (idProduct) => {

    //REEMPLAZO DE IF POR UN OPERADOR TERNARIO
    localStorage.getItem('shoppingCart') && (shoppingCart = getShoppingCart());

    const repeatedProduct = shoppingCart.find(product => product.idProduct == idProduct);

    if (repeatedProduct) {
        repeatedProduct.amount++;
        const productAmount = document.getElementById(`productAmount${repeatedProduct.idProduct}`);
        productAmount.innerText = `Cantidad: ${repeatedProduct.amount}`;    
        updateTotalCart(shoppingCart);
    } else {
        addProductToCart(idProduct);
    }
}

//FUNCIÓN PARA PUSHEAR UN NUEVO OBJETO AL ARRAY Y AGREGAR UN ELEMENTO CON LOS DATOS DE MISMO
const addProductToCart = async (idProduct) => {
    const container = document.getElementById('cartListContainer');
    const productCollection = await getProduct();
    const product = productCollection.find(product => product.idProduct == idProduct);
    product.amount++;
    shoppingCart.push(product);
    
    const div = document.createElement("div");
    div.classList.add("d-flex");
    div.classList.add("justify-content-between");
    div.classList.add("align-items-center");
    div.classList.add("w-100");


    //UTILICÉ EL OPTIONAL CHAINING OPERATOR PARA VALIDAR LA EXISTENCIA DEL PRODUCTO Y, EN CASO CONTRARIO, ENVIAR UN MSJ DE ERROR
    div.innerHTML = `
                    <p>${product?.name || alert("El producto ingresado no existe")}</p>
                    <p id=productAmount${product.idProduct}>Cantidad: ${product?.amount || alert("El stock del producto está agotado")}</p>
                    <p> $${product.price}</p>
                    <button class="deleteBtnProduct" value=${product.idProduct}>&times;</button>
                    `;
    container.appendChild(div);
    updateTotalCart(shoppingCart);
}

//FUNCIÓN PARA RETOMAR LA INFORMACIÓN DESDE EL STORAGE.JS Y EVITAR QUE SE PIERDAN LOS DATOS AL REFRESCAR LA PÁGINA. 
const recoverShoppingCart = (shoppingCart) => {
    const container = document.getElementById('cartListContainer');

    container.innerHTML = "";

    shoppingCart.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("d-flex");
        div.classList.add("justify-content-between");
        div.classList.add("align-items-center");
        div.classList.add("w-100");
        div.innerHTML = `
                        <p>${product.name}</p>
                        <p id=productAmount${product.idProduct}>Cantidad: ${product.amount}</p>
                        <p>$${product.price}</p>
                        <button class="deleteBtnProduct" value=${product.idProduct}>&times;</button>
                        `;
        container.appendChild(div);
    });
};

//FUNCIÓN PARA ELIMINAR LOS PRODUCTOS UTILIZANDO EL ID DE CADA UNO. RETOMO ESTA FUNCIÓN EN LAS FUNCIONALIDADES DEL BOTÓN DELETE PRODUCT

const deleteProductCart = (idProduct) => {
    const storageCart = getShoppingCart();
    const updateStorageCart = storageCart.filter( item => item.idProduct != idProduct);

    updateTotalCart(updateStorageCart);
    recoverShoppingCart(updateStorageCart);
}

const deleteAllProductCart = () => {
    updateTotalCart([]);
    recoverShoppingCart([]);
}


export {productValidation, addProductToCart, recoverShoppingCart, deleteProductCart, deleteAllProductCart };