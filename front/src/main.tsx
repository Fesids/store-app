import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RoutesList } from './presentation/routes/Routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RoutesList/>
  </StrictMode>,
)
