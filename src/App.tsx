import reactLogo from './assets/react.svg'
import PWABadge from './PWABadge.tsx'
import './App.css'

function App() {

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>pubcast</h1>
      <PWABadge />
    </>
  )
}

export default App
