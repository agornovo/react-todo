import React from 'react';

function AddTodoForm({ onAddTodo, todoTitle, setTodoTitle }) {

    const Todo = (id, title) => {
        return { id: id, title: title }
    }

    function handleTitleChange(event) {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    function handleAddTodo(event) {
        event.preventDefault();
        if (todoTitle !== '') {
            const todoObject = Todo(Date.now(), todoTitle,);
            onAddTodo(todoObject);
            console.log(todoObject);
            setTodoTitle('');
        }
    }

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor='todoTitle'>Title</label>
            <input id="todoTitle" name="title" value={todoTitle}
                onChange={handleTitleChange} />
            <button>Add</button>
        </form>
    );
}

export default AddTodoForm;