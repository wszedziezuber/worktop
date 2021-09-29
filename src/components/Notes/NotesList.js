import React, { useState, useEffect } from 'react';
import { Note } from './Note'
import { AddNote } from './AddNote'

export const NotesList = ({ notes, handleAddNote, handleDeleteNote }) => {
    return (
        <div className="notes-list-container"> 
        <div className="notes-list">
        <AddNote handleAddNote={handleAddNote}/>
            
            {notes.map((note) => (
            <Note 
                id={note.id}
                text={note.text}
                date={note.date}
                handleDeleteNote={handleDeleteNote}
            />
            ))}



        </div>
        </div>
    )
}