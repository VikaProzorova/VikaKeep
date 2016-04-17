var controllers = {
    login:        require("./controller/login.js"),
    registration: require("./controller/registration.js"),
    notes:        require("./controller/notes.js"),
    profile:      require("./controller/profile.js")
};

var router = {};

Object.keys(controllers).forEach(function(controllerName) {
    router[ controllerName ] = function() {
        controllers[ controllerName ]( router );
    }
});

module.exports = router;