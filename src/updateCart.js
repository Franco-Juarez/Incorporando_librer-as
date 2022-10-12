import { saveShoppingCart } from "./storage.js";

//FUNCIÓN PARA ACTUALIZAR EL CARRITO, LOS PRECIOS Y EL CONTENIDO DE LOS MISMOS. 

const updateTotalCart = (shoppingCart) => {
    const totalAmount = shoppingCart.reduce((acc, item) => acc + item.amount, 0);
    const totalPrice = shoppingCart.reduce((acc, item) => acc + ((item.price * item.amount) * 1.21), 0);

    showTotal(totalAmount, totalPrice);
    saveShoppingCart(shoppingCart);
}

//FUNCIÓN PARA MOSTRAR MOSTRAR DATOS ACTUALIZADOS DE CANTIDAD Y PRECIO TOTAL.

const showTotal = (totalAmount, totalPrice) => {
    const cartCounter = document.getElementById("totalAmount");
    const cartFinalPrice = document.getElementById("finalBuyBtn");

    cartCounter.innerText = totalAmount;
    cartFinalPrice.innerText = `COMPRAR: $${totalPrice}`;
}

export { updateTotalCart };