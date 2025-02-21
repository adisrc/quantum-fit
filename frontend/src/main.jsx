import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'//authentication
import App from './App'
import { WorkoutProvider } from './contexts/WorkoutContext'
import { BrowserRouter } from 'react-router-dom'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <BrowserRouter>
    <WorkoutProvider>
      <App />
      </WorkoutProvider>
      </BrowserRouter>
    </ClerkProvider>
)