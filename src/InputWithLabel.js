import React from 'react';

function InputWithLabel({ todoTitle, handleTitleChange, children }) {
    return (
        <>
            <label
                htmlFor='todoTitle'>
                {children}
            </label>
            <input id="todoTitle"
                name="title"
                value={todoTitle}
                onChange={handleTitleChange} />
        </>
    );
}

export default InputWithLabel;