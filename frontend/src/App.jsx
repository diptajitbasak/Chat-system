import Chat from './Components/Chat.jsx'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">CHAT SYSTEM</p>
          <h1>Assistant</h1>
        </div>
        <span className="app-indicator" aria-hidden="true" />
      </header>
      <Chat />
    </main>
  )
}

export default App
