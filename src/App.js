import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {

  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  async function fetchData() {

    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` }
    }

    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      const todos = data.records.map((todo) => {
        const newTodo = {
          id: todo.id,
          title: todo.fields.title
        }
        return newTodo
      });

      setTodoList(todos);
      setIsLoading(false);

    } catch (error) {
      console.log(error.message);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    if (!isLoading)
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList, isLoading]);

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
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

export default App;
