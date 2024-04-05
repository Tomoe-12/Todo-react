import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm.js';
import TodoList from './components/TodoList.js';
import CheckAllAndRemaining from './components/CheckAllAndRemaining.js';
import TodoFilters from './components/TodoFilters.js';
import ClearCompletedBtn from './components/ClearCompletedBtn.js';
import { useEffect, useState } from 'react';
import { computeHeadingLevel } from '@testing-library/react';

function App() {

  let [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3003/todo')
      .then(res => res.json())
      .then((todos) => {
        setTodos(todos)
      })
  }, [])


  let addTodo = (todo) => {
    fetch('http://localhost:3003/todo', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    setTodos(prevState => [...prevState, todo])
  }

  let deleteTodo = (todoId) => {
    fetch(`http://localhost:3003/todo/${todoId}`, {
      method: "DELETE"
    })
    setTodos(prevState => {
      return prevState.filter(todo => {
        return todo.id !== todoId
      });
    })
  }

  let updateTodo = (todo) => {
    //server
    fetch(`http://localhost:3003/todo/${todo.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    //client
    setTodos(prevState => {
      return prevState.map(t => {
        if (t.id === todo.id) {
          return todo
        }
        return t
      })
    })
  }

  let checkAll = () => {
    // server
    todos.forEach(t => {
      t.completed = true 
      updateTodo(t)
    })
    // client
    setTodos((prevState) => {
      return prevState.map(t => {
        return { ...t, completed: true }
      })
    })
  }

  let remainingCount = todos.filter(t => !t.completed).length

  let clearCompleted = ()=> {
    // server
    todos.forEach(t => {
      if(t.completed) deleteTodo(t.id)
    })
    //client
    setTodos((prevState => {
      return prevState.filter(t => !t.completed)
    }))
  }


  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        <CheckAllAndRemaining remainingCount={remainingCount} checkAll={checkAll} />
        <div className="other-buttons-container">
          <TodoFilters />
          <ClearCompletedBtn clearCompleted={clearCompleted}/>
        </div>
      </div>
    </div>
  );
}

export default App;