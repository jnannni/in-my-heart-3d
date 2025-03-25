import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SceneTransitionProvider } from './components/contexts/sceneTransitionContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SceneTransitionProvider>
      <App />
    </SceneTransitionProvider>    
  </StrictMode>,
)
