import { useState } from 'react'
import './App.css'

/**
 * Button component with click counter functionality
 * @param {Object} props - Component props
 * @param {number} props.initialCount - Initial count value
 * @returns {JSX.Element} Button component
 */
function CounterButton({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount)
  
  return (
    <button onClick={() => setCount((prev) => prev + 1)}>
      count is {count}
    </button>
  )
}

/**
 * Main App component
 * @returns {JSX.Element} App component
 */
function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="terminal-button-container">
          <button 
            className="terminal-button"
            onClick={() => window.location.href = 'terminal.html'}
          >
            Terminal View
          </button>
        </div>
      </header>
      
      <main className="app-content">
        <div className="card">
          <CounterButton initialCount={0} />
          <p>
            Welcome to my portfolio site! Use the toggle button to switch views.
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
