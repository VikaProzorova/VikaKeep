document.getElementById('notesButton').onclick = function() {
    router.notes();
};

document.getElementById('logoutButton').onclick = function() {
    API.users.logout()
    .then(function(response){
        if (response.status) {
           router.login();
        }
    })
};

var fullName          = document.getElementById('name');
var email             = document.getElementById('email');
var oldPassword       = document.getElementById('oldPassword');
var newPassword       = document.getElementById('newPassword');
var repeatNewPassword = document.getElementById('repeatNewPassword');


function showPopup (message) {
    var popupBackground = document.getElementById('popupBackground');
    var popup           = document.getElementById('popup');
    var closeButton     = document.getElementById('closeButton');
    var popupText       = document.getElementById('popupText');


    closeButton.onclick   = function() {
        popup.style.visibility           = "hidden";
        closeButton.style.visibility     = "hidden";
        popupText.style.visibility       = "hidden";
        popupBackground.style.visibility = "hidden";
    }

    popupBackground.style.visibility = "visible";
    popup.style.visibility           = "visible";
    popupText.style.visibility       = "visible";
    closeButton.style.visibility     = "visible";

    popupText.innerHTML = message;


}


API.users.show()
.then(function(user) {
    fullName.value = user.name;
    email.value    = user.email;
});

document.getElementById('changeDataButton').onclick = function() {
    var newUserData = {
        name:  fullName.value,
        email: email.value
    };

    API.users.update(newUserData)
    .then(function(user) {
        showPopup('Changes successfully saved');
    })
    .catch(function(error) {
        showPopup(error);
    });
}

document.getElementById('changePasswordButton').onclick = function() {
    var passwordData = {
        oldPassword:       oldPassword.value,
        newPassword:       newPassword.value,
        repeatNewPassword: repeatNewPassword.value
    };

    if (passwordData.newPassword != passwordData.repeatNewPassword) {
        showPopup('Passwords not match');
        return;
    }

    API.users.changePassword(passwordData)
    .then(function (user) {
        showPopup('Password successfully saved');
        oldPassword.value       = '';
        newPassword.value       = '';
        repeatNewPassword.value = '';
    })
    .catch(function(error) {
        showPopup(error);
    });
}


