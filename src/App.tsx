import React, {Suspense, useEffect} from 'react';
import MainScene from './components/MainScene';
import PortalsScene from './components/PortalsScene/PortalsScene';
import './App.css';
import {Canvas} from '@react-three/fiber';
import CanvasLoader from './components/loader/CanvasLoader';
import { Leva } from 'leva';
import { useSceneTransition } from './components/contexts/sceneTransitionContext';


const App = () => {
  const {currentScene} = useSceneTransition();  
  const dpr = Math.min(window.devicePixelRatio, 2);

  return (
    <div className='container'>
      <div className='scene'>  
        <Leva />
        <Canvas dpr={dpr} shadows camera={{position: [0, 0, -8], fov: 50, near: 1, far: 1000}}>
          <Suspense fallback={<CanvasLoader />}>
            {currentScene === 'mainScene' ? <MainScene /> : <PortalsScene />}                            
          </Suspense>
        </Canvas>
      </div>
    </div>    
  )
}

export default App