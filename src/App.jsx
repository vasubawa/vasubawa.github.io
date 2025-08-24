import { useState } from 'react'
import './App.css'

/**
 * Simple PDF Viewer using iframe
 * @param {Object} props - Component props
 * @param {string} props.pdfUrl - URL or path to the PDF file
 * @returns {JSX.Element} PDF viewer component
 */
function SimplePDFViewer({ pdfUrl }) {
  return (
    <div className="pdf-viewer">
      <iframe
        src={pdfUrl}
        width="100%"
        height="100%"
        title="PDF Resume"
        style={{
          border: 'none',
          minHeight: '80vh',
        }}
      />
    </div>
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
        <div className="pdf-container">
          <SimplePDFViewer pdfUrl="/Resume.pdf" />
        </div>
      </main>
    </div>
  )
}

export default App
