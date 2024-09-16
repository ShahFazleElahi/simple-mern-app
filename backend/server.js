// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mernnotes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const noteSchema = new mongoose.Schema({
    text: String,
});

const Note = mongoose.model('Note', noteSchema);

app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.post('/notes', async (req, res) => {
    const newNote = new Note({
        text: req.body.text,
    });
    await newNote.save();
    res.json(newNote);
});

app.listen(PORT, () => {
    console.log('Server is running on port 5000');
});
