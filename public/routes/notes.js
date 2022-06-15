const router = require('express').Router();
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils.js');
const uuidv1 = require('uuidv1');


// GET Route for retrieving all the notes
router.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific notes
router.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => notes.id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        });
});

// POST Route for a new UX/UI note
router.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv1(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

// DELETE Route for a specific note
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all tips except the one with the ID provided in the URL
            const result = json.filter((note) => note.id !== id);

            // Save that array to the filesystem
            writeToFile('./db/db.json', result);

            // Respond to the DELETE request
            res.json(`Item ${id} has been deleted 🗑️`);
        });
});

module.exports = router;