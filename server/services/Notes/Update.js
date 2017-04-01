const Base = require('../Base');

class Update extends Base {
    validate (data) {
        const rules =  {
            text: [ {max_length: 1000} ],
            id:   [ 'required', 'positive_integer'],
            tagsIDs: [ {list_of: 'integer'}]
        };

        return this.runValidation(data, rules);
    }

    execute (data) {
        return this.model.sequelize.transaction(t => {
            return this.model.NotesTagsMap.destroy({
                where: { noteId: data.id },
                transaction: t
            })
            .then(() => {
                const updateNote = this.model.Note.update({text: data.text}, {
                    where: { id: data.id },
                    limit: 1,
                    transaction: t
                })

                const saveNewTags = this.model.NotesTagsMap.bulkCreate(data.tagsIDs.map(tagId => ({tagId, noteId: data.id})), {
                    transaction: t
                })

                return Promise.all([updateNote, saveNewTags]);
            })
        })
        .then(() => ({
            data: data,
            status: 1
        }))
    }
};

module.exports = Update;