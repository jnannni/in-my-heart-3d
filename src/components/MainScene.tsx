import { Canvas, useLoader, useThree } from '@react-three/fiber'
import React, { Suspense, useEffect, useState } from 'react'
import GlassWall from './3dmodels/GlassWall'
import CanvasLoader from './loader/CanvasLoader'
import { OrbitControls, Sky, Preload, PerspectiveCamera, useGLTF } from '@react-three/drei'
import './style.css'
import WallShattered from './3dmodels/WallShattered'
import { Physics } from '@react-three/rapier'
import ShatterBeginning from './3dmodels/ShatterBeginning'
import ShatterMiddle from './3dmodels/ShatterMIddle'
import Heart from './3dmodels/Heart'
import { Leva, useControls } from 'leva'
import AnimatedCamera from './camera/AnimatedCamera'

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

  return (
    <div className='container'>
        <div className='scene'>
              <Leva />
            <Canvas>           
              <Suspense fallback={<CanvasLoader />}> 
                <Physics>             
                  <Heart scale={1.5} position={[0, -2.3, 4]} index={index}/>
                  <ambientLight intensity={1} />
                  <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
                  {index === 0 && <GlassWall scale={1.5} onClick={() => setIndex(1)}/>}
                  {index === 1 && <ShatterBeginning scale={1.5} onClick={() => setIndex(2)}/>}
                  {index === 2 && <ShatterMiddle scale={1.5} onClick={() => setIndex(3)}/>}
                  <WallShattered visible={index === 3 ? true : false} scale={1.5} index={index}/>                  
                  {/* <directionalLight position={[-10, 20, -8]} intensity={1.5} /> */}
                  <PerspectiveCamera makeDefault position={[c.positionX, c.positionY, -8]}/>                
                </Physics>
              </Suspense>
              <OrbitControls />
            </Canvas>
        </div>
    </div>
  )
}

export default MainScene