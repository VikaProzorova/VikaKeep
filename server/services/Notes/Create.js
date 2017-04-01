const Base = require('../Base');

class Create extends Base {
    validate (data) {
        const rules =  {
            text: [ {max_length: 1000} ],
            tagsIDs: [ {list_of: 'integer'}]
        };

        return this.runValidation(data, rules);
    }

    execute (data) {
        console.log(data)
        const note = {
            text: data.text,
            userId: this.userId,
            NotesTagsMaps: data.tagsIDs.map(tagId => ({tagId}))
         }

        return this.model.Note.create(note, {
            include: this.model.NotesTagsMap
        })
        .then(note => {
            return {
                data: {
                    id: note.id,
                    date: note.createdAt,
                    updatedAt: note.updatedAt,
                    text: note.text,
                    status: note.status,
                    tagsIDs: note.NotesTagsMaps.map(({tagId}) => tagId)
                },
                status: 1
            };
        })
    }
};

module.exports = Create;