import React from 'react';
import InputWithLabel from './InputWithLabel';

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
            <InputWithLabel todoTitle={todoTitle}
                handleTitleChange={handleTitleChange}
                label="Title" />
            <button>Add</button>
        </form>
    );
}

export default AddTodoForm;