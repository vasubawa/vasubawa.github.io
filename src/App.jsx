import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
  // Get data from window.portfolioData if available
  const data = typeof window !== 'undefined' ? window.portfolioData : null;
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      </header>
      
      <main className="app-content">
        <div className="card">
          <CounterButton initialCount={0} />
          <p>
            Welcome to my portfolio site! Use the toggle button in the top-right corner to switch views.
          </p>
        </div>
        
        <p className="read-the-docs">
          {data?.quotes ? data.quotes[Math.floor(Math.random() * data.quotes.length)] : "The best way to predict the future is to invent it."}
        </p>
      </main>
    </div>
  )
}

export default App
