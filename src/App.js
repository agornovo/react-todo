import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {

  const [todoList, setTodoList] = React.useState([]);

  React.useEffect(() => {
    new Promise((resolve, reject) =>
      setTimeout(
        () => resolve({
          data: {
            todoList:
              JSON.parse(localStorage.getItem("savedTodoList"))
          }
        }),
        2000
      )
    )
      .then(result => {
        setTodoList(result.data.todoList);
      });
  }, []);

  React.useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  const [todoTitle, setTodoTitle] = React.useState('');

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  function removeTodo(id) {
    const updatedTodoList = todoList.filter(
      item => id !== item.id
    );
    setTodoList(updatedTodoList);
  }

  return (
    <>
      <h1>Todo List</h1>
      <hr />
      <AddTodoForm onAddTodo={addTodo} todoTitle={todoTitle}
        setTodoTitle={setTodoTitle} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App;
