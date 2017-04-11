module.exports = function(sequelize, DataTypes) {
    const Note = sequelize.define("Note", {
        text: {type: DataTypes.TEXT, allowNull: false},
        status: {type: DataTypes.ENUM, values: ['NEW', 'IN_PROGRESS', 'PENDING', 'DONE', 'DELETED'], defaultValue: 'NEW'},
        userId: {type: DataTypes.INTEGER, allowNull: false}
    }, {
        classMethods: {
            associate(models) {
                Note.belongsTo(models.User, {foreignKey: 'userId'});
                Note.hasMany(models.NotesTagsMap, {foreignKey: 'noteId', onDelete: 'cascade'})
            }
        }
    });

    return Note;
};