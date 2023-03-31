import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

  async function postTodoItem(todo) {
    try {
      const airtableData = {
        fields: {
          title: todo.title
        }
      };

      const options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
        },
        body: JSON.stringify(airtableData)
      }

      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error has ocurred:
                               ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();

      if (dataResponse.id !== null)
        todo.id = dataResponse.id;

      return todo;

    } catch (error) {
      console.log(error.message);
      return todo;
    }
  }

  async function deleteTodoItem(id) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
        }
      }

      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/`
        + id;

      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error has ocurred:
                               ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();

      return dataResponse.id;

    } catch (error) {
      console.log(error.message);
      return null;
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

  async function addTodo(newTodo) {
    setTodoList([...todoList, await postTodoItem(newTodo)]);
  }

  function removeTodo(id) {
    deleteTodoItem(id);
    const updatedTodoList = todoList.filter(
      item => id !== item.id
    );
    setTodoList(updatedTodoList);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
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
        } />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
