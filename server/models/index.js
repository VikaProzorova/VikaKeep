const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');

module.exports = function({config}) {
    const sequelize = new Sequelize(config.database, config.user, config.password, {
        host: config.host,
        dialect: "mysql"
    });

    const db = {};

    fs
        .readdirSync(__dirname)
        .filter(file => {
            return !file.startsWith('.') && (file !== 'index.js');
        })
        .forEach(file => {
            const model = sequelize.import(path.join(__dirname, file));
            db[model.name] = model;
        });

    Object.keys(db).forEach(modelName => {
        const model = db[modelName];
        if (model.associate) {
            model.associate(db);
        }
    });

    console.log(db)

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    // sequelize.sync({force: false})
    // .then(() => console.log('====='))

    return db;
}

