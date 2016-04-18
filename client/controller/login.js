var API      = require('../api.js');
var popup    = require('../popup.js');

module.exports = function(router) {
    popup.init();

    var email    = document.getElementById('email');
    var password = document.getElementById('password');

    document.getElementById('regButton').onclick = function() {
        router.registration();
    };

    document.getElementById('submitButton').onclick = function() {
        var user = {
            email: email.value,
            password: password.value
        };

        API.users.login(user)
        .then(function(response){

            if (response.status == 1) {
               router.notes();
            }
            else {
                popup.showPopup('Wrong email and/or password');
            }
        })
    }
}