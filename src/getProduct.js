const getProduct = async () => {
    try {
        const response = await fetch ("./src/dataBase.json");
        const data = await response.json();
        return data;
    } catch (error) {
        Swal.fire({
            icon: "warning",
            title: "Ha ocurrido un error",
            text: "Por favor, vuelva a efectuar la operación",
            showConfirmButton: false,
            timer: 3500,
        })
    }
}

export {getProduct};



