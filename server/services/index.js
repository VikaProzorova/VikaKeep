const services = {
    Notes: require('./Notes'),
    Users: require('./Users'),
    Tags:  require('./Tags')
};

module.exports = params => {
    return (actionName, data, userId) => {
        const parts        = actionName.split('/');
        const actionClass  = services[parts[0]][parts[1]];
        const actionObject = new actionClass({userId: userId, model: params.model});

        return actionObject.run(data);
    }
};