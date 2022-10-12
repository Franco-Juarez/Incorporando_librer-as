import { deleteProductCart, deleteAllProductCart } from "./actionCart.js";

//VARIABLES PARA DEFINIR FUNCIONALIDADES DE LOS BOTONES


const modalBtn = document.getElementById("modalBtn");
const finalBuyBtn = document.getElementById("finalBuyBtn");
const exitBtn = document.getElementById("exitBtn");
const deleteProduct = document.getElementById("cartContainer");

modalBtn.addEventListener("click", () => {
    const asideChange = document.querySelector(".asideNone");
    asideChange.classList.toggle("aside");
})

exitBtn.addEventListener("click", () => {
    const asideChange = document.querySelector(".asideNone");
    asideChange.classList.toggle("aside");
})

deleteProduct.addEventListener("click", (e) => {
    e.stopPropagation();
    Swal.fire({
        icon: "warning",
        title: "¿Desea eliminar este producto?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
    }).then((res) => {
        if (res.isConfirmed) {
             Swal.fire (
                "Eliminado",
                "El producto ha sido eliminado", 
                "success",  
            ) 
            e.target.classList.contains("deleteBtnProduct") && deleteProductCart(e.target.value);
        }
    })
})

finalBuyBtn.addEventListener("click", () => {
    const asideChange = document.querySelector(".asideNone");
    asideChange.classList.toggle("aside");
    Swal.fire({
        icon: "success",
        title: "La compra ha sido realizada con éxito",
        text: "Gracias por comprar en Pico Tres Estudio",
        showConfirmButton: false,
        timer: 2500,
    })
    deleteAllProductCart();
})
