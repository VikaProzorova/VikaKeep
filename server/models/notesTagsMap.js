module.exports = function(sequelize, DataTypes) {
    const NotesTagsMap = sequelize.define('NotesTagsMap', {
        tagId: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
        noteId: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true}
    }, {
        classMethods: {
            associate(models) {
                NotesTagsMap.belongsTo(models.Note, {foreignKey: 'noteId', onDelete: 'cascade'})
                NotesTagsMap.belongsTo(models.Tag, {foreignKey: 'tagId', onDelete: 'cascade'})
            }
        }
    });

    return NotesTagsMap;
};