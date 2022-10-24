import { addCards } from "./app.js"
import { recoverShoppingCart } from "./src/actionCart.js";
import { getShoppingCart } from "./src/storage.js";
import { updateTotalCart } from "./src/updateCart.js";
import { getProduct } from "./src/getProduct.js";

//FUNCIÓN PARA RENDERIZAR LOS PRODUCTOS Y RECUPERAR DATOS DEL LOCAL STORAGE UNA VEZ REFRESCADA LA PÁGINA. 

document.addEventListener("DOMContentLoaded", async () => {
    const productCollection = await getProduct();

    addCards(productCollection);

    if (localStorage.getItem('shoppingCart')) {
        const shoppingCartIndex = getShoppingCart();
        recoverShoppingCart(shoppingCartIndex);
        updateTotalCart(shoppingCartIndex);
    }
})