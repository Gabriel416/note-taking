import React from 'react';

import './style_button.css';

const StyleButton = ({ style, active, label, onToggle }) => {

    const handleToggle = e => {
        e.preventDefault();
        onToggle(style)
    }

    const className = active ? 'RichEditor-activeButton' : 'RichEditor-styleButton';

    return (
        <span className={className} onMouseDown={e => handleToggle(e)}>
            {label}
        </span>
    );
}

export default StyleButton;