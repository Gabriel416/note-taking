import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';

import BlockStyleControls from '../BlockStyleControls';
import InlineStyleControls from '../InlineStyleControls';

import { EDITOR_STYLE_MAP } from '../../constants';
import { CREATE_NOTE, UPDATE_NOTE } from '../../Mutations';

import './editor_container.css';

const EditorContainer = ({ refetch, selectedNote, setSelectedNote }) => {
    const editor = useRef(null);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    );
    const [createNote] = useMutation(CREATE_NOTE);
    const [updateNote] = useMutation(UPDATE_NOTE);

    useEffect(() => {
        focusEditor();
    }, []);

    useEffect(() => {
        if (selectedNote) {
            onChange(EditorState.createWithContent(convertFromRaw(JSON.parse(selectedNote.body))))
        }
    }, [selectedNote]);

    const focusEditor = () => {
        editor.current.focus();
    }

    const onChange = editorState => setEditorState(editorState);

    const toggleBlockType = (blockType) => {
        onChange(
            RichUtils.toggleBlockType(
                editorState,
                blockType
            )
        );
    }

    const toggleInlineStyle = (inlineStyle) => {
        onChange(
            RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle
            )
        );
    }

    const getBlockStyle = (block) => {
        switch (block.getType()) {
            case 'blockquote': return 'RichEditor-blockquote';
            default: return null;
        }
    }

    const isSubmittable = () => {
        return convertToRaw(editorState.getCurrentContent()).blocks.some(({ text }) => text.trim())
    };

    const getButtonText = () => {
        let btnText = '';

        if (loading) {
            btnText = 'Saving...'
        } else if (selectedNote) {
            btnText = 'Update'
        } else {
            btnText = 'Save'
        }

        return btnText;
    }

    const save = (contentState) => {
        const request = {
            variables: {
                body: JSON.stringify(contentState)
            }
        }

        if (selectedNote) {
            return updateNote({
                ...request,
                variables: {
                    ...request.variables,
                    id: selectedNote.id
                }
            });
        }

        return createNote(request);
    }

    const saveNote = async () => {
        setSuccessMsg('');
        setErrorMsg('');
        setLoading(true);
        const contentState = convertToRaw(editorState.getCurrentContent());
        if (isSubmittable()) {
            try {
                await save(contentState);
                setSuccessMsg('Successfully saved note!');
                refetch();
            } catch (e) {
                console.log(e, 'e')
                setErrorMsg('Error saving note :(')
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div>
            <section className="flex space-between">
                <h2 className="ml-1">{selectedNote ? 'Update' : 'Create'} Note</h2>
                {selectedNote && <button className="btn primary small" onClick={() => setSelectedNote(null)}>New Note +</button>}
            </section>
            <BlockStyleControls
                editorState={editorState}
                onToggle={toggleBlockType}
            />
            <InlineStyleControls
                editorState={editorState}
                onToggle={toggleInlineStyle}
            />
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={onChange}
                blockStyleFn={getBlockStyle}
                customStyleMap={EDITOR_STYLE_MAP}
            />
            <div className="btn-wrapper">
                <button disabled={loading || !isSubmittable()} className="btn primary" onClick={() => saveNote()}>{getButtonText()}</button>
            </div>
            {successMsg && <p className="success right">{successMsg}</p>}
            {errorMsg && <p className="error right">{errorMsg}</p>}
        </div >
    );
}

export default EditorContainer;