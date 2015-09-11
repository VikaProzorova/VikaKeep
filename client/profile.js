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


API.users.show()
.then(function(user) {
    fullName.value  = user.name;
    email.value     = user.email;
});

document.getElementById('changeDataButton').onclick = function() {
    var newUserData = {
        name:  fullName.value,
        email: email.value
    };

    API.users.update(newUserData)
    .then(function(user) {
        alert('Changes successfully saved');
    })
    .catch(function(error) {
        alert(error);
    });
}

document.getElementById('changePasswordButton').onclick = function() {
    var passwordData = {
        oldPassword:       oldPassword.value,
        newPassword:       newPassword.value,
        repeatNewPassword: repeatNewPassword.value
    };

    if (passwordData.newPassword !== passwordData.repeatNewPassword) {
        alert('Passwords not match');
        return;
    }

    API.users.changePassword(passwordData)
    .then(function (user) {
        alert('Password successfully saved');
        oldPassword.value       = '';
        newPassword.value       = '';
        repeatNewPassword.value = '';
    })
    .catch(function(error) {
        alert(error);
    });
}