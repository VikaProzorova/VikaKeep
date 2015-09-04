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

var fullName  = document.getElementById('name');
var email     = document.getElementById('email');

API.users.show().then(function(user) {
    fullName.value  = user.name;
    email.value     = user.email;
});