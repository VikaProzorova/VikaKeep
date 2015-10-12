function Base(config, services) {
    this.config   = config;
    this.services = services;
};

Base.prototype.renderPromise = function(promise, res) {
    promise
    .then(function(data) {
        res.send(data);
    })
    .catch(function(error){
        res.send({
            status: 0,
            error:  error
        })
    })
};

module.exports = Base;