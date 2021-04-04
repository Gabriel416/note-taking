import React from 'react';
import classnames from 'classnames';
import { useMutation, NetworkStatus } from '@apollo/client';
import { List } from 'react-content-loader';
import { Editor, convertFromRaw, EditorState } from 'draft-js';

import { DELETE_NOTE } from '../../Mutations';

import './notes_container.css'

const NotesContainer = ({
    error,
    loading,
    networkStatus,
    refetch,
    notes,
    selectedNote,
    setSelectedNote
}) => {
    const [deleteNote, { loading: mutationLoading, error: mutationError }] = useMutation(DELETE_NOTE);

    const handleDelete = async (id) => {
        await deleteNote({
            variables: {
                id
            }
        })
        refetch();
    }

    const renderNotes = () => {
        if (loading || mutationLoading || networkStatus === NetworkStatus.refetch) {
            return Array.from(Array(notes.length)).map((_, i) => <List className="box" key={i} />)
        } else if (error) {
            return <p>{`Error! ${error}`}</p>
        }

        return notes.map((note, i) => {
            const isActive = selectedNote ? selectedNote.id === note.id : false;
            const parsedPost = EditorState.createWithContent(convertFromRaw(JSON.parse(note.body)));
            return (
                <div key={i} className={classnames('box', isActive ? 'active-post' : '')} onClick={() => setSelectedNote(note)}>
                    <Editor editorState={parsedPost} readOnly />
                    <button className="btn small" onClick={() => handleDelete(note.id)}>Delete Note</button>
                    {mutationError && <p className="error">Error occurred when deleting note</p>}
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