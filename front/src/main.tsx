import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RoutesList } from './presentation/routes/Routes.tsx'
import { Provider } from 'react-redux'
import { store } from './context/redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RoutesList/>
    </Provider>
  
  </StrictMode>,
)
