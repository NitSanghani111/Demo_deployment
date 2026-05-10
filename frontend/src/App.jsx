import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'https://api.shashvatenterprise.com/tasks'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchTasks = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(API_URL)
      setTasks(response.data)
    } catch (err) {
      setError('Failed to fetch tasks. Please ensure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async (e) => {
    e.preventDefault()
    if (!title) return
    setLoading(true)
    try {
      await axios.post(API_URL, { title, description })
      setTitle('')
      setDescription('')
      fetchTasks()
    } catch (err) {
      setError('Failed to add task.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteTask = async (id) => {
    setLoading(true)
    try {
      await axios.delete(`${API_URL}/${id}`)
      fetchTasks()
    } catch (err) {
      setError('Failed to delete task.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Task Manager app</h1>

      <form className="input-group" onSubmit={addTask}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !title}>
            {loading ? 'Processing...' : 'Add Task'}
          </button>
        </div>
      </form>

      {error && <div className="error">{error}</div>}
      {loading && tasks.length === 0 && <div className="loading">Loading tasks...</div>}

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div className="task-info">
              <span className="task-title">{task.title}</span>
              {task.description && <span className="task-desc">{task.description}</span>}
            </div>
            <button className="delete-btn" onClick={() => deleteTask(task.id)} disabled={loading}>
              Delete
            </button>
          </li>
        ))}
        {!loading && tasks.length === 0 && !error && (
          <div style={{ color: '#03152dff' }}>No tasks found. Add one above!</div>
        )}
      </ul>
    </div>
  )
}

export default App
