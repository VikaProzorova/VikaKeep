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
        const tagsFilter = data.tagsIDs.length
            ? {
                tagId: {
                    $in: data.tagsIDs
                }
            }
            : undefined

        const statusFilter = data.statuses.length
            ? data.statuses
            : ['NEW', 'IN_PROGRESS']

        const findNotes = {
            where: {
                status: {
                    $in: statusFilter
                },
                userId: this.userId
            },
            include: [{
                model: this.model.NotesTagsMap,
                where: tagsFilter
            }],
            order: 'updatedAt DESC'
        }


        return this.model.Note.findAll(findNotes)
        .then(notes => {
            const notesIds = notes.map(note => note.id)

            return this.model.NotesTagsMap.findAll({
                where: {
                    noteId: {
                        $in: notesIds
                    }
                }
            })
            .then(notesTagsMaps => {
                const tagsIdsByNote = notesTagsMaps.reduce((acc, noteTagMap) => {
                    if (!acc[ noteTagMap.noteId ]) {
                        acc[ noteTagMap.noteId ] = []
                    }

                    acc[ noteTagMap.noteId ].push(noteTagMap.tagId)
                    return acc
                }, {})

                const data = notes.map(note => {
                    return {
                        id: note.id,
                        date: note.createdAt,
                        updatedAt: note.updatedAt,
                        text: note.text,
                        status: note.status,
                        tagsIDs: tagsIdsByNote[ note.id ] || []
                    }
                })

                return {
                    data: data,
                    status: 1
                }
            })
        });
    }
};

module.exports = List;
