const routes = {
    Notes: require('./Notes'),
    Users: require('./Users')
};

module.exports = params => {

    return actionName => {
        const parts        = actionName.split('/');
        const actionClass  = routes[parts[0]];
        const actionObject = new actionClass(params.config, params.services);

        return actionObject[parts[1]].bind(actionObject);
    }
}