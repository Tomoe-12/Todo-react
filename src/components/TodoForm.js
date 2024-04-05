import React, { useState } from 'react'

export default function TodoForm({addTodo}) {

    let [title, setTitle] = useState('')
    let handleSubmit = (e) => {
        e.preventDefault()
        let todo = {
            id :  JSON.stringify(Math.random()),
            title ,
            completed : false 
        }
        // add to-do 
        addTodo(todo)
        // clear input
        setTitle('')
    }

    return (
        <form action="#" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-input"
                placeholder="What do you need to do?"
                onChange={e => setTitle(e.target.value)}
                value={title}
            />
        </form>
    )
}
