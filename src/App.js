import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [todoTitle, setTodoTitle] = React.useState('');

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <hr />
      <AddTodoForm onAddTodo={addTodo} todoTitle={todoTitle} setTodoTitle={setTodoTitle} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
