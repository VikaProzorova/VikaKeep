//"use strict";

// var API      = require("../api.js");
// var popup    = require("../popup.js");

// module.exports = function(router) {
//     popup.init();

//     var fullName       = document.getElementById("name");
//     var email          = document.getElementById("email");
//     var password       = document.getElementById("password");
//     var repeatPassword = document.getElementById("repeatPassword");

//     document.getElementById("loginButton").onclick = function() {
//         router.login();
//     };

//     document.getElementById("submitButton").onclick = function() {
//         if (password.value !== repeatPassword.value) {
//             popup.showPopup("Passwords not match");
//             return;
//         }

//         var user = {
//             email: email.value,
//             password: password.value,
//             name: fullName.value
//         };
//         API.users.register(user)
//         .then(function(response){
//             if (response.status == 1) {
//                router.login();
//             }
//             else {
//                 popup.showPopup("Wrong data");
//             }
//         });
//     };
// };