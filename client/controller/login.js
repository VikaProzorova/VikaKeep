const API      = require("../api.js");
const popup    = require("../popup.js");

module.exports = (router) => {
    popup.init();

    const email    = document.getElementById("email");
    const password = document.getElementById("password");

    document.getElementById("regButton").onclick = () => router.registration();

    document.getElementById("submitButton").onclick = () => {
        let user = {
            email: email.value,
            password: password.value
        };

        API.users.login(user)
        .then(response => {
            if (response.status == 1) {
               router.notes();
            }
            else {
                popup.showPopup("Wrong email and/or password");
            }
        })
    }
}