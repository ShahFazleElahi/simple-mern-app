// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [notes, setNotes] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/notes')
            .then(response => setNotes(response.data))
            .catch(error => console.error('Error fetching notes:', error));
    }, []);

    const addNote = () => {
        axios.post('http://localhost:5000/notes', { text })
            .then(response => setNotes([...notes, response.data]))
            .catch(error => console.error('Error adding note:', error));
        setText('');
    };

    return (
        <div className="container">
            <h1>Notes</h1>
            <input
                className="input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter a new note"
                fullWidth
            />
            <button
                className="button"
                onClick={addNote}
                size="large"
                fullWidth
            >
                Add Note
            </button>
            <ul className="list">
                {notes.map((note, index) => (
                    <li className="list-item" key={index}>
                        {note.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
