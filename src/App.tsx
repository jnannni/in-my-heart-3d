import { Suspense } from 'react';
import MainScene from '@components/MainScene';
import { PortalsScene } from '@components/PortalsScene';
import './App.css';
import { Canvas } from '@react-three/fiber';
import CanvasLoader from '@loader/CanvasLoader';
import { useSceneTransition } from '@contexts/sceneTransitionContext';
import { usePortalTransition } from '@contexts/portalTransitionContext';

const App = () => {
  const { currentScene } = useSceneTransition();
  const { currentPortal, setCurrentPortal } = usePortalTransition();
  const dpr = Math.min(window.devicePixelRatio, 2);
  const portalsTip =
    currentPortal === '' ? (
      <div>
        <div className="portal-enter">Double click the portal to enter🚪</div>
        <div className="turn-tip">Drag to rotate the carusel🎡</div>
      </div>
    ) : (
      <div className="portal-exit" onClick={() => setCurrentPortal('')}>
        🔙 Back
      </div>
    );
  const wallTip = (
    <div className="main-scene-tip">Click to destroy the glass wall❄️</div>
  );

  return (
    <div className="container">
      {currentScene !== 'mainScene' ? portalsTip : wallTip}
      <div className="scene">
        <Canvas
          dpr={dpr}
          shadows
          camera={{ position: [0, 0, -8], fov: 50, near: 1, far: 1000 }}
        >
          <Suspense fallback={<CanvasLoader />}>
            {currentScene === 'mainScene' ? <MainScene /> : <PortalsScene />}
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default App;
