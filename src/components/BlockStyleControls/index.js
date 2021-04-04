import React from 'react';
import StyleButton from '../StyleButton';

import { BLOCK_TYPES } from '../../constants';

const BlockStyleControls = ({ editorState, onToggle }) => {
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    const renderBlockTypes = () => {
        return BLOCK_TYPES.map((type) =>
            <StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                onToggle={onToggle}
                style={type.style}
            />
        )
    }

    return (
        <>
            <p className="bold ml-1">Block Style Controls</p>
            <div className="RichEditor-controls">
                {renderBlockTypes()}
            </div>

        </>
    );
};

export default BlockStyleControls;