import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { SceneTransitionProvider } from '@contexts/sceneTransitionContext'
import { PortalTransitionProvider } from '@contexts/portalTransitionContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortalTransitionProvider>
      <SceneTransitionProvider>
        <App />
      </SceneTransitionProvider>
    </PortalTransitionProvider>   
  </StrictMode>,
)
