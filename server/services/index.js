var services = {
    Notes: require('./Notes'),
    Users: require('./Users')
};

module.exports = function(params) {
    return function(actionName, data, userID) {
        var parts        = actionName.split('/');
        var actionClass  = services[parts[0]][parts[1]];
        var actionObject = new actionClass({userID: userID, Storage: params.Storage});
        return actionObject.run(data);
    }
};