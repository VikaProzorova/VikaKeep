var API      = require('../api.js');
var template = require('../templates/login.html');
//var router   = require('../router.js');
var popup    = require('../popup.js');
module.exports = function(router) {
    document.body.innerHTML = template;

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
console.log("oooo44", router);
            if (response.status == 1) {
               router.notes();
            }
            else {
                popup.showPopup('Wrong email and/or password');
            }
        })
    }
}