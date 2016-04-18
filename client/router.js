var controllers = {
    login:        require("./controller/login.js"),
    registration: require("./controller/registration.js"),
    notes:        require("./controller/notes.js"),
    profile:      require("./controller/profile.js")
};

var templates = {
    login:        require("./templates/login.html"),
    registration: require("./templates/registration.html"),
    notes:        require("./templates/notes.html"),
    profile:      require("./templates/profile.html")
};

var router = {};

Object.keys(controllers).forEach(function(controllerName) {
    router[ controllerName ] = function() {
        console.log("render", controllerName);
        document.body.innerHTML = templates[ controllerName ];
        controllers[ controllerName ](router);
    }
});

module.exports = router;