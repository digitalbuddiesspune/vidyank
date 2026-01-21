import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center gap-8 mb-8">
          <a href="https://vite.dev" target="_blank" className="transition-transform hover:scale-110">
            <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="transition-transform hover:scale-110">
            <img src={reactLogo} className="h-24 w-24 animate-spin" style={{ animationDuration: '20s' }} alt="React logo" />
          </a>
        </div>
        <h1 className="text-5xl font-bold mb-8 text-gray-800 dark:text-gray-200">
          Vite + React
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
          >
            count is {count}
          </button>
          <p className="text-gray-600 dark:text-gray-300">
            Edit <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App
