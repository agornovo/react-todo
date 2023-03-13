import React from 'react';

function AddTodoForm(props) {

    const Todo = (title, id) => {
        return { title: title, id: id }
    }

    function handleTitleChange(event) {
        const newTodoTitle = event.target.value;
        props.setTodoTitle(newTodoTitle);
    }

    function handleAddTodo(event) {
        event.preventDefault();
        if (props.todoTitle !== '') {
            const todoObject = Todo(props.todoTitle, Date.now());
            props.onAddTodo(todoObject);
            console.log(todoObject);
            props.setTodoTitle('');
        }
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