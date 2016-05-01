"use strict";

var API      = require("../api.js");
var popup    = require("../popup.js");

module.exports = function(router) {
    popup.init();

    document.getElementById("notesButton").onclick = function() {
        router.notes();
    };

    document.getElementById("logoutButton").onclick = function() {
        API.users.logout()
        .then(function(response){
            if (response.status) {
               router.login();
            }
        });
    };

    var fullName          = document.getElementById("name");
    var email             = document.getElementById("email");
    var oldPassword       = document.getElementById("oldPassword");
    var newPassword       = document.getElementById("newPassword");
    var repeatNewPassword = document.getElementById("repeatNewPassword");


    API.users.show()
    .then(function(user) {
        fullName.value = user.name;
        email.value    = user.email;
    });

    document.getElementById("changeDataButton").onclick = function() {
        var newUserData = {
            name:  fullName.value,
            email: email.value
        };

        API.users.update(newUserData)
        .then(function(user) {
            popup.showPopup("Changes successfully saved");
        })
        .catch(function(error) {
            popup.showPopup(error);
        });
    };

    document.getElementById("changePasswordButton").onclick = function() {
        var passwordData = {
            oldPassword:       oldPassword.value,
            newPassword:       newPassword.value,
            repeatNewPassword: repeatNewPassword.value
        };

        if (passwordData.newPassword != passwordData.repeatNewPassword) {
            popup.showPopup("Passwords not match");
            return;
        }

        API.users.changePassword(passwordData)
        .then(function (user) {
            popup.showPopup("Password successfully saved");
            oldPassword.value       = "";
            newPassword.value       = "";
            repeatNewPassword.value = "";
        })
        .catch(function(error) {
            popup.showPopup(error);
        });
    };
};

