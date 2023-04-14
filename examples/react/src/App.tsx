import { useState } from 'react'
import './App.css'

import ClickAnywhere from '../../../src/react'

function App() {
  const [count, setCount] = useState(0)

  function onTrigger (e: MouseEvent) {
    console.log('onTrigger', e)
  }

  return (
    <div className="App">
      <div>
        <ClickAnywhere ignores={ ['card'] } onTrigger={onTrigger}>
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </ClickAnywhere>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
