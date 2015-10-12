var services = {
    Notes: require('./Notes'),
    Users: require('./Users')
};

module.exports = function(actionName, data, userID) {
    var parts  = actionName.split('/');
    var actionClass = services[parts[0]][parts[1]];
    var actionObject = new actionClass(userID);
    return actionObject.run(data);
};