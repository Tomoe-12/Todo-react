import React, { useState } from 'react'

export default function Todo({todo , deleteTodo , updateTodo }) {

  let [ isEdit , setIsEdit ] = useState(false)
  let [ title , setTitle ] = useState(todo.title)


  let updateTodoHandler = (e)=>{
    e.preventDefault()

    let updateTod = {
      id : todo.id ,
      title ,
      completed : todo.completed
    }
    updateTodo(updateTod)
    setIsEdit(false)
  }

  let handleCheckbox = ()=>{
    let updateTod = {
      id : todo.id ,
      title ,
      completed : !todo.completed
    }
    updateTodo(updateTod)
  }

  return (
    <li className="todo-item-container">
        <div className="todo-item">
            <input type="checkbox" checked={todo.completed} onChange={handleCheckbox}/>
           { !isEdit &&  <span onDoubleClick={ ()=> {
            if(todo.completed){
              setIsEdit(false)
            }else{
              setIsEdit(true)
            }
           } } className={`todo-item-label ${todo.completed ? 'line-through' : ''}`}>
            {todo.title}
            </span>}
            { isEdit && 
             <form onSubmit={updateTodoHandler}>
              <input type="text" className="todo-item-input" value={title} onChange={ (e) => setTitle(e.target.value)} />
             </form>
            }
        </div>
        <button className="x-button" onClick={() => deleteTodo(todo.id)}>
            <svg
            className="x-button-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
            />
            </svg>
        </button>
    </li>
  )
}