import React from 'react';

function InputWithLabel({ todoTitle, handleTitleChange, children }) {
    const inputRef = React.useRef();
    React.useEffect(() => {
        inputRef.current.focus();
    });
    return (
        <>
            <label
                htmlFor='todoTitle'>
                {children}
            </label>
            <input id="todoTitle"
                ref={inputRef}
                name="title"
                value={todoTitle}
                onChange={handleTitleChange} />
        </>
    );
}

export default InputWithLabel;