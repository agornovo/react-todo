import React from 'react';

function AddTodoForm(props) {

    const [todoTitle, setTodoTitle] = React.useState('');

    function handleTitleChange(event) {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    function handleAddTodo(event) {
        event.preventDefault();
        props.onAddTodo(todoTitle);
        console.log(todoTitle);
        event.target.reset();
    }

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor='todoTitle'>Title</label>
            <input id="todoTitle" name="title" value={props.todoTitle}
                onChange={handleTitleChange} />
            <button>Add</button>
        </form>
    );
}

export default AddTodoForm;