import React from 'react';
import TodoListItem from './TodoListItem';

const todoList = [
    {
        id: 1,
        title: "Read the book"
    },
    {
        id: 2,
        title: "Watch the video"
    },
    {
        id: 3,
        title: "Complete assignment"
    }
]

function TodoList() {
    return (
        <ul>
            {todoList.map(function (todo) {
                return <TodoListItem key={todo.id} todo={todo.title} />;
            })}
        </ul>
    );
}

export default TodoList;