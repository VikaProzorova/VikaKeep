"use strict";

// require("./styles.css");
require("bootstrap/dist/css/bootstrap.css");
var router = require("./router.js");

window.onpopstate = function() {
    router.start();
};

router.start();