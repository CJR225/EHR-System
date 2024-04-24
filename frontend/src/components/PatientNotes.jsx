import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../PatientDash.module.css';
import Switch from '@mui/material/Switch';

function PatientNotes({ selectedPatient }) {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [newConsult, setNewConsult] = useState('');
    const [showDelete, setShowDelete] = useState(false); // State to control visibility of delete buttons

    useEffect(() => {
        if (selectedPatient) {
            fetchNotes();
        }
    }, [selectedPatient]);

    const fetchNotes = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/patients/${selectedPatient.id}/notes`);
            setNotes(response.data);
        } catch (error) {
            console.error("Error fetching patient notes:", error);
            toast.error("Failed to fetch notes.");
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            await axios.delete(`http://localhost:3001/patients/${selectedPatient.id}/notes/${noteId}`);
            setNotes(notes => notes.filter(note => note.note_id !== noteId));
            toast.success("Note deleted successfully!");
        } catch (error) {
            console.error("Failed to delete note:", error);
            toast.error("Failed to delete note.");
        }
    };

    const handleAddNote = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3001/patients/${selectedPatient.id}/notes`, {
                notes: newNote,
                consult: newConsult
            });
            setNotes(notes => [response.data, ...notes]); // prepend the new note
            setNewNote('');
            setNewConsult('');
            toast.success("Note added successfully!");
        } catch (error) {
            console.error("Error adding new note:", error);
            toast.error("Failed to add note.");
        }
    };

    // Toggle switch handler
    const handleToggle = () => {
        setShowDelete(!showDelete);
    };

    return (
        <div className="notes-container">
    <h2 className="notes-title">Patient Notes</h2>
    <Switch checked={showDelete} onChange={handleToggle} color="primary" />
    <div className="notes-grid">
        {/* New note input card */}
        <div className="note-card">
            <form onSubmit={handleAddNote} className="note-content">
                <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter note here..."
                    required
                />
                <textarea
                    value={newConsult}
                    onChange={(e) => setNewConsult(e.target.value)}
                    placeholder="Enter consultation details here..."
                    required
                />
                <button className={styles.formButton} type="submit">Add Note</button>
            </form>
        </div>

        {/* Existing notes */}
        {notes.map((note, index) => (
            <div key={index} className="note-card">
                <div className="note-content">
                    <strong>Notes:</strong>
                    <p>{note.notes}</p>
                    <strong>Consult:</strong>
                    <p>{note.consult}</p>
                </div>
                {showDelete && (
                    <div className="note-footer">
                        <button onClick={() => handleDeleteNote(note.note_id)} className="delete-btn">Delete</button>
                    </div>
                )}
            </div>
        ))}
    </div>
</div>

    );
}

export default PatientNotes;
