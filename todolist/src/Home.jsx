import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill
} from 'react-icons/bs'
import Create from './Create'

function Home() {
  const [todos, setTodos] = useState([])

  const fetchTodos = () => {
    axios.get('http://localhost:3000/get')
      .then(result => setTodos(result.data))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleEdit = (id) => {
    axios.put('http://localhost:3000/update/' + id)
      .then(() => {
        setTodos(prev =>
          prev.map(todo =>
            todo._id === id
              ? { ...todo, done: !todo.done }
              : todo
          )
        )
      })
      .catch(error => console.log(error))
  }

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/delete/' + id)
      .then(() => {
        setTodos(prev => prev.filter(todo => todo._id !== id))
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="home">
      <h2>ToDo List</h2>

      <Create fetchTodos={fetchTodos} />

      {todos.length === 0 ? (
        <h2>No Rec Found</h2>
      ) : (
        todos.map(todo => (
          <div className="task" key={todo._id}>
            <div
              className="checkbox"
              onClick={() => handleEdit(todo._id)}
            >
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}

              <p className={todo.done ? 'line_through' : ''}>
                {todo.task}
              </p>
            </div>

            <span onClick={() => handleDelete(todo._id)}>
              <BsFillTrashFill className="icon delete" />
            </span>

          </div>
        ))
      )}
    </div>
  )
}

export default Home
