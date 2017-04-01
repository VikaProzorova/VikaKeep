module.exports = function(sequelize, DataTypes) {
    const Tag = sequelize.define("Tag", {
        name: {type: DataTypes.STRING, allowNull: false},
        userId: {type: DataTypes.INTEGER, allowNull: false}
    }, {
        classMethods: {
            associate(models) {
                Tag.belongsTo(models.User, {foreignKey: 'userId'});
                Tag.hasMany(models.NotesTagsMap, {foreignKey: 'tagId'})
            }
        }
    });

    return Tag;
};