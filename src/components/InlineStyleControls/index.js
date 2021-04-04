import React from 'react';
import StyleButton from '../StyleButton';

import { INLINE_STYLES } from '../../constants';

const InlineStyleControls = ({ editorState, onToggle }) => {
    const currentStyle = editorState.getCurrentInlineStyle();

    const renderControls = () => {
        return INLINE_STYLES.map((type) =>
            <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={onToggle}
                style={type.style}
            />
        )
    }

    return (
        <>
            <p className="bold ml-1">Inline Style Controls</p>
            <div className="RichEditor-controls">
                {renderControls()}
            </div>
        </>
    );
};

export default InlineStyleControls;