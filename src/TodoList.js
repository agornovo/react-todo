import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList }) {
    return (
        <ul>
            {todoList.map(function (todo) {
                return <TodoListItem key={todo.id} todo={todo.title} />;
            })}
        </ul>
    );
}

export default TodoList;