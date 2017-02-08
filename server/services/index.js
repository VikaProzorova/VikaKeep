const services = {
    Notes: require('./Notes'),
    Users: require('./Users')
};

module.exports = params => {
    return (actionName, data, userID) => {
        const parts        = actionName.split('/');
        const actionClass  = services[parts[0]][parts[1]];
        const actionObject = new actionClass({userID: userID, Storage: params.Storage});

        return actionObject.run(data);
    }
};