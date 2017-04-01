module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        name: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, unique: true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false}
    }, {
        classMethods: {
            associate(models) {
                User.hasMany(models.Note, {foreignKey: 'userId'});
                User.hasMany(models.Tag, {foreignKey: 'userId'})
            }
        }
    });

    return User;
};