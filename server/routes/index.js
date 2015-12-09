var routes = {
    Notes: require('./Notes'),
    Users: require('./Users')
};

module.exports = function(params) {

    return function(actionName) {
        var parts        = actionName.split('/');
        var actionClass  = routes[parts[0]];
        var actionObject = new actionClass(params.config, params.services);

        return actionObject[parts[1]].bind(actionObject);
    }
}