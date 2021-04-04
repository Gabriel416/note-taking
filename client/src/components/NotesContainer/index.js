import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Editor, convertFromRaw, EditorState } from 'draft-js';

import './notes_container.css'

const NotesContainer = ({ notes, selectedNote, setSelectedNote }) => {
    const renderNotes = () => {
        return notes.map((note, i) => {
            const isActive = selectedNote ? selectedNote.id === note.id : false;
            const parsedPost = EditorState.createWithContent(convertFromRaw(JSON.parse(note.body)));
            return (
                <div key={i} className={classnames('box', isActive ? 'active-post' : '')} onClick={() => setSelectedNote(note)}>
                    <Editor editorState={parsedPost} readOnly />
                    <button className="btn small">Delete Note</button>
                </div>
            )
        })
    }
    return (
        <div className="notes_container_wrapper">
            <h2 className="ml-1">Notes</h2>
            {renderNotes()}
        </div>
    )
}

export default NotesContainer;