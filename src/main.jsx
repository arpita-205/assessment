import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/assessment">
      <div className="w-full h-screen m-0 p-0">
        <App />
      </div>
    </BrowserRouter>
  </StrictMode>
);
