import React from 'react';

function AddTodoForm(props) {

    const [todoTitle, setTodoTitle] = React.useState('');

    const Todo = (title, id) => {
        return { title: title, id: id }
    }

    React.useEffect(() => {
        document.getElementById('todoTitle').value = todoTitle;
    }, [todoTitle]);

    function handleTitleChange(event) {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    function handleAddTodo(event) {
        event.preventDefault();
        const todoObject = Todo(todoTitle, Date.now());
        props.onAddTodo(todoObject);
        console.log(todoObject);
        setTodoTitle('');
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