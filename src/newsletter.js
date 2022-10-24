const newsletterForm = document.getElementById('newsletterForm');
const userEmail = document.getElementById('userEmail');
const userName = document.getElementById('userName');
const submitBtn = document.querySelector(".submitBtn");
const message = document.getElementById("message");


const sendEmail = async (body) => {
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        }
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', settings);
    return response;
};

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const body = {
        service_id: 'service_904cx84',
        template_id: 'template_t2c1y5r',
        user_id: 'wNbozu2q68fo_uDx4',
        template_params: {
            'from_name': userName.value,
            'from_name': userEmail.value,
            'message': message.value
        }
    };

    sendEmail(body) 
        .then((response) => {
            console.log(response.status);
            Toastify({
                text: "Tu mensaje ha sido enviado correctamente",
                duration: 1500,
                style: {
                    background: "linear-gradient(to right, #ffb347, #ffcc33)",
                },
            }).showToast();
        })
        .catch((error) => {
            console.log(error);
        })
})