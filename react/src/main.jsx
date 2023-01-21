import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ContextProvider } from './context/ContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ContextProvider>
            <App/>
        </ContextProvider>
    </React.StrictMode>,
)
