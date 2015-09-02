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