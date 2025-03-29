import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SceneTransitionProvider } from '@contexts/sceneTransitionContext.tsx'
import { PortalTransitionProvider } from '@contexts/portalTransitionContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortalTransitionProvider>
      <SceneTransitionProvider>
        <App />
      </SceneTransitionProvider>
    </PortalTransitionProvider>   
  </StrictMode>,
)
