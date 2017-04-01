const Base = require('../Base');

class List extends Base {
    validate (data) {
        const rules = {
            tagsIDs: [ {list_of: 'integer'}],
            statuses: [{list_of: {max_length: 1000}}]
        }
        return this.runValidation(data, rules);
    }

    execute (data) {
        if (!data.statuses.length) {
            data.statuses = ['NEW', 'IN_PROGRESS']
        }
        const tagsFilter = data.tagsIDs.length
            ? {
                id: {
                    $in: data.tagsIDs
                }
            }
            : undefined

        const query = {
            where: {
                status: {
                    $in: data.statuses
                },
                userId: this.userId
            },
            include: [{
                model: this.model.NotesTagsMap,
                include: {
                    model: this.model.Tag,
                    where: tagsFilter
                }
            }]
        }
        return this.model.Note.findAll(query)
        .then(notesList => {
            return {
                data: notesList.map(note => ({
                    id: note.id,
                    date: note.createdAt,
                    updatedAt: note.updatedAt,
                    text: note.text,
                    status: note.status,
                    tagsIDs: note.NotesTagsMaps.map(({tagId}) => tagId)
                })),
                status: 1
            };
        });
    }
};

module.exports = List;
