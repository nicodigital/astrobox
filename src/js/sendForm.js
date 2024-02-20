function sendForm() {

    const form = document.querySelector("#contact-form");
    const ajax_form_url = '/mailer/send-form.php';

    if (form) {

        const name = form.querySelector('[name=name]');
        const email = form.querySelector('[type=email]');
        const phone = form.querySelector('[name=phone]');
        const message = form.querySelector('[name=message]');
        const btn_submit = form.querySelector('[type=submit]');

        const nameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^\+\d{0,3}(?:\s?\d{1,3}){1,4}$|^\d{8,9}$/;
        const messageRegex = /^.{16,}$/; // min 16 caracteres

        function captcha(get) {

            const operadores = ['+', '-', '*'];
            const num1 = Math.floor(Math.random() * 10);
            const num2 = Math.floor(Math.random() * 10);
            const operador = operadores[Math.floor(Math.random() * operadores.length)];


            let result;

            switch (operador) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
            }

            form.querySelector('#captcha').setAttribute('data-val', result);

            if (get == 'operation') {
                return `${num1} ${operador} ${num2} = `;
            } else {
                return result;
            }

        }

        const setCaptcha = document.querySelector('#captcha');
        setCaptcha.value = captcha('operation');

        function getBaseUrl() {

            var url = window.location.href;

            var index = url.indexOf('?');
            if (index !== -1) {
                url = url.substring(0, index);
            }

            var hashIndex = url.indexOf('#');
            if (hashIndex !== -1) {
                url = url.substring(0, hashIndex);
            }

            return url;

        }

        const baseURL = getBaseUrl();
        // console.log(baseURL);

        function validField(field, regex) {
            let field_val = field.value;

            // if ( !regex.test(field_val) ) {
            if (!field_val.match(regex)) {
                field.classList.add('invalid');
                return false;
            }

            field.classList.remove('invalid');
            return true;
        }

        name.input = () => {
            validField(name, nameRegex);
        }

        email.input = () => {
            validField(email, emailRegex);
        }

        phone.input = () => {
            validField(phone, phoneRegex);
        }

        message.input = () => {
            validField(message, messageRegex);
        }

        function checkForm() {

            let formStatus = '';
            let captchaPass = false;

            const captcha = form.querySelector('#captcha').dataset.val;
            const captchaResult = form.querySelector('#captchaResult');
            // console.log( captchaResult+' = '+ captcha );

            if (captchaResult.value === captcha) {
                captchaPass = true;
                captchaResult.classList.remove('invalid');
            } else {
                captchaResult.classList.add('invalid');
            }

            if (validField(name, nameRegex) && validField(email, emailRegex) && validField(phone, phoneRegex) && validField(message, messageRegex) && captchaPass) {
                btn_submit.disabled = false;
                formStatus = true;
            } else {
                btn_submit.disabled = true;
                formStatus = false;
            }

            return formStatus;

        }


        /* Revisamos el form cada vez que un campo cambia  */
        form.onchange = () => {
            checkForm()
        }

        /* Avisamos que falta algo si alguien hace mouseover y tiene errores */
        btn_submit.onmouseover = () => {
            checkForm()
        }

        form?.addEventListener("submit", async (e) => {
            e.preventDefault();

            let loader = document.querySelector(".loader");
            loader.style.display = "block";

            if (checkForm()) {

                /* Send Form by AJAX */
                fetch(ajax_form_url, {

                    method: 'POST',
                    credentials: 'same-origin',
                    mode: 'no-cors',
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }),
                    body: 'name=' + name.value +
                        '&email=' + email.value +
                        '&phone=' + phone.value +
                        '&message=' + message.value
                    // '&recaptcha_response=' + recaptcha_response
                })
                    .then(function (response) {
                        //   return response.text;
                        return response.json();
                    })
                    .then(function (content) {

                        loader.style.display = 'none';

                        // console.log(content);
                        name.value = '';
                        email.value = '';
                        phone.value = '';
                        message.value = '';

                        window.location.href = baseURL + "/gracias";


                    }).catch(function (error) {
                        console.log(JSON.stringify(error));
                    });

            }
        });

    }

}

export default sendForm;