import React, { useEffect, useRef, useMemo, memo } from 'react'
import Mac from '../3dmodels/Mac'
import Ipad from '../3dmodels/Ipad'
import * as THREE from 'three'
import { useControls } from 'leva'
import { Text3D, Edges, AccumulativeShadows, RandomizedLight, Float, Text } from '@react-three/drei'
import Project from './Project'

const ProjectsCard = ({active='', info = [{name: '', description: '', skills: '', link: ''}]}) => {
  const ipadRef = useRef<THREE.Mesh>(null);
  const macRef = useRef<THREE.Mesh>(null);
  const blendValue = active ? 5 : 1.5;
  const opacity = active ? 1 : 0.5;
  const x = useControls('RandLight', {
          positionX: { value: 0, min: -10, max: 10, step: 1},
          positionY: { value: 0, min: -10, max: 10, step: 1},
          positionZ: { value: 0, min: -10, max: 10, step: 1},
      })

  return (
    <>
      <Text3D
      font='./fonts/Inter_Bold.json'        
      position={[-2.5, -1.6, -9.5]}
      castShadow
      receiveShadow>
        Projects
        <meshStandardMaterial color={'#f5fefd'} />
        <Edges linewidth={1} threshold={15} color={"black"} />
      </Text3D>
      <group>
        <Project info={info[0]} txtposition={[2, 1.1, -7]} tipposition={[1.5, -0.5, -6.9]}>
          <Mac ref={macRef} vidPath='/img/mars.mov' position={[1.5, 0, -7]} scale={3} rotation={[0.5, -0.5, 0]}/>
        </Project>
        <Project info={info[1]} txtposition={[-0.8, 0, -6.4]} tipposition={[-1.5, -1.3, -6.4]}>
          <Ipad ref={ipadRef} position={[-1.5, -0.8, -6.5]} rotation={[Math.PI / 2, Math.PI / 2 + 0.2, 0.1]} scale={4} />
        </Project>                          
        <Project info={info[2]} txtposition={[-2, 1.1, -7]} tipposition={[-1.5, -0.5, -6.9]}>
          <Mac ref={macRef} vidPath='/img/hanoi.mov' position={[-1.5, 1.5, -7]} scale={3} rotation={[0.7, 0.5, 0]}/>
        </Project>
      </group>
      <AccumulativeShadows temporal frames={50} color='#f5fefd' colorBlend={blendValue} toneMapped={true} alphaTest={0.5} opacity={opacity} scale={40} position={[0, -2, -9.45]}>
          <RandomizedLight intensity={Math.PI} amount={8} radius={4} ambient={0.5} position={[5, 5, -2]} bias={0.001} />
      </AccumulativeShadows>
    </>
  )
}

export default ProjectsCard