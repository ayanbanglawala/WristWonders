import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { CartProvider } from './Context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
