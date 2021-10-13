import React from 'react';

export const Note = ({id, text, date, handleDeleteNote}) => {
    return (
    <div className="note">
        <span>
        {text}
        </span>
        <div className="note-footer">
            <small>{date}</small>
            <i 
            className="far fa-trash-alt delete-icon delete"
            onClick={() => handleDeleteNote(id)}
            />
        </div>
    </div>
    
    )
}