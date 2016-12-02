"use strict";

// require("./styles.css");
require("bootstrap/dist/css/bootstrap.css");
const router = require("./router.js");

window.onpopstate = function() {
    router.start();
};

router.start();