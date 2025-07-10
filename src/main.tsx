import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize theme before React renders
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system'
  
  let actualTheme: 'light' | 'dark' = 'dark'
  
  if (savedTheme === 'system') {
    actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } else {
    actualTheme = savedTheme
  }
  
  // Apply theme to document immediately
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(actualTheme)
}

// Initialize theme immediately
initializeTheme()

createRoot(document.getElementById("root")!).render(<App />);
