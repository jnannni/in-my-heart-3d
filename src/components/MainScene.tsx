import { useThree } from '@react-three/fiber';
import { useEffect, useState, useRef } from 'react';
import GlassWall from '@3dmodels/GlassWall';
import { Environment, CameraControls, Text3D } from '@react-three/drei';
import WallShattered from '@3dmodels/WallShattered';
import { Physics } from '@react-three/rapier';
import ShatterBeginning from '@3dmodels/ShatterBeginning';
import ShatterMiddle from '@3dmodels/ShatterMIddle';
import Heart from '@3dmodels/Heart';
import * as THREE from 'three';
import { useSceneTransition } from '@contexts/sceneTransitionContext';
import './style.css';

const MainScene = () => {
  const [index, setIndex] = useState(0);
  const controlsRef = useRef<CameraControls>(null);
  const scene = useThree((state) => state.scene);
  const { setCurrentScene } = useSceneTransition();

  useEffect(() => {
    if (scene.getObjectByName('heart') && controlsRef.current) {
      if (index === 3) {
        const targetPosition = new THREE.Vector3();
        scene.getObjectByName('heart')?.getWorldPosition(targetPosition);
        setTimeout(() => {
          controlsRef.current?.setLookAt(
            0,
            1,
            0,
            targetPosition.x,
            0,
            targetPosition.z,
            true,
          );
        }, 500);
        setTimeout(() => {
          setCurrentScene('portalsScene');
          console.log('portalsScene');
        }, 3000);
      } else controlsRef.current?.setLookAt(0, 0, -8, 0, 0, 0, true);
    }
  }, [index, scene, setCurrentScene]);

  return (
    <>
      <Physics>
        <Heart scale={1.5} position={[0, -1, 4]} index={index} name={'heart'} />
        <Text3D
          font="./fonts/Inter_Bold.json"
          position={[5, 1.5, 5]}
          rotation={[-0.2, Math.PI, 0]}
          scale={0.5}
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={0.5}
          letterSpacing={-0.02}
        >
          find out what is 'on my heart'❤️
          <meshStandardMaterial color={'#ff3300'} />
        </Text3D>
        <ambientLight intensity={0.5} />
        <Environment preset="dawn" background blur={0.5} />
        {index === 0 && <GlassWall scale={1.5} onClick={() => setIndex(1)} />}
        {index === 1 && (
          <ShatterBeginning scale={1.5} onClick={() => setIndex(2)} />
        )}
        {index === 2 && (
          <ShatterMiddle scale={1.5} onClick={() => setIndex(3)} />
        )}
        <WallShattered
          visible={index === 3 ? true : false}
          scale={1.5}
          index={index}
        />
      </Physics>
      <CameraControls smoothTime={0.5} ref={controlsRef} />
    </>
  );
};

export default MainScene;
