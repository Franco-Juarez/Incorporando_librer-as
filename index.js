import { addCards } from "./app.js"
import { recoverShoppingCart } from "./src/actionCart.js";
import { getShoppingCart } from "./src/storage.js";
import { updateTotalCart } from "./src/updateCart.js";

//FUNCIÓN PARA RENDERIZAR LOS PRODUCTOS Y RECUPERAR DATOS DEL LOCAL STORAGE UNA VEZ REFRESCADA LA PÁGINA. 

document.addEventListener("DOMContentLoaded", () => {
    addCards();

    if (localStorage.getItem('shoppingCart')) {
        const shoppingCartIndex = getShoppingCart();
        recoverShoppingCart(shoppingCartIndex);
        updateTotalCart(shoppingCartIndex);
    }
})