import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SceneTransitionProvider } from './components/contexts/sceneTransitionContext.tsx'
import { PortalTransitionProvider } from './components/contexts/portalTransitionContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortalTransitionProvider>
      <SceneTransitionProvider>
        <App />
      </SceneTransitionProvider>
    </PortalTransitionProvider>   
  </StrictMode>,
)
