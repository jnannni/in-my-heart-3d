import { useThree } from '@react-three/fiber'
import React, {useEffect, useState, useRef } from 'react'
import GlassWall from './3dmodels/GlassWall'
import { Environment, CameraControls } from '@react-three/drei'
import './style.css'
import WallShattered from './3dmodels/WallShattered'
import { Physics } from '@react-three/rapier'
import ShatterBeginning from './3dmodels/ShatterBeginning'
import ShatterMiddle from './3dmodels/ShatterMIddle'
import Heart from './3dmodels/Heart'
import { useControls } from 'leva'
import * as THREE from 'three'
import { useSceneTransition } from './contexts/sceneTransitionContext'

const MainScene = () => {
  const x = useControls('Heart', {
    scale: { value: 1, min: 0.1, max: 10, step: 0.1},
    positionX: { value: 0, min: -10, max: 10, step: 0.1},
    positionY: { value: -2.3, min: -10, max: 10, step: 0.1},
    positionZ: { value: 4, min: -10, max: 10, step: 0.1},
  })
  const c = useControls('Camera', {
    positionX: { value: 0, min: -10, max: 20, step: 0.1},
    positionY: { value: 0, min: -10, max: 10, step: 0.1},
    positionZ: { value: 0, min: -10, max: 10, step: 0.1},
  })  
  const [index, setIndex] = useState(0);  
  const controlsRef = useRef<CameraControls>(null);
  const scene = useThree((state) => state.scene);
  const {setCurrentScene} = useSceneTransition();

  useEffect(() => {    
    if (scene.getObjectByName('heart') && controlsRef.current) {
      if(index === 3) {
        const targetPosition = new THREE.Vector3();        
        scene.getObjectByName('heart')?.getWorldPosition(targetPosition);        
        setTimeout(() => {
          controlsRef.current?.setLookAt(0, 1, 0, targetPosition.x, 0, targetPosition.z, true);
        }, 500)
        setTimeout(() => {
          setCurrentScene('portalsScene');
          console.log('portalsScene');
        }, 3000)       
      } else controlsRef.current?.setLookAt(0, 0, -8, 0, 0, 0, true);      
    }
  }, [index])

  return (
    <>                
        <Physics>             
          <Heart scale={1.5} position={[0, -1, 4]} index={index} name={'heart'}/>
          <ambientLight intensity={0.5} />
          <Environment preset="dawn" background blur={0.5} />
          {index === 0 && <GlassWall scale={1.5} onClick={() => setIndex(1)}/>}
          {index === 1 && <ShatterBeginning scale={1.5} onClick={() => setIndex(2)}/>}
          {index === 2 && <ShatterMiddle scale={1.5} onClick={() => setIndex(3)}/>}
          <WallShattered visible={index === 3 ? true : false} scale={1.5} index={index}/>                  
          {/* <directionalLight position={[-10, 20, -8]} intensity={1.5} /> */}                
        </Physics>      
      <CameraControls smoothTime={0.5} ref={controlsRef}/>
    </>
  )
}

export default MainScene