import React, { useState } from 'react'
import axios from 'axios'

function Create({ fetchTodos }) {
  const [task, setTask] = useState('')

  const handleAdd = () => {
    if (!task.trim()) return

    axios.post('http://localhost:3000/add', { task })
      .then(() => {
        setTask('')
        fetchTodos()   // ✅ refresh list
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button type="button" onClick={handleAdd}>
        Add
      </button>

      <button
        className="theme-toggle"
        onClick={() => document.body.classList.toggle('dark')}
      >
        🌙
      </button>
    </div>
  )
}

export default Create
