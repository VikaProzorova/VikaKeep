class Base {
    constructor(config, services) {
        this.config   = config;
        this.services = services;
    }
    renderPromise(promise, res) {
        promise
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            console.log(error);
            res.send({
                status: 0,
                error:  error
            })
        })
    }
    getArrayFromQuery(queryString) {
        return (queryString || '').split(',').filter(element => element !== '')
    }
}

module.exports = Base;