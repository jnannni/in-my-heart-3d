import { Float } from '@react-three/drei'
import React, { useRef, useState } from 'react'
import Annotation from './Annotation'
import './styles.css';
import * as THREE from 'three'
import { Vector3 } from 'three';

const Skill = ({
    groupPosition: [x, y, z] = [0,0,0],
    annotationPosition: [aX, aY, aZ] = [0,0,0],
    annotationStyle = {}, 
    skillName = '', 
    skillLevel = '', 
    children}) => { 
        
        const groupRef = useRef<THREE.Group>(null);
    
  return (
    <Float floatIntensity={0.2} rotationIntensity={0.2}>
        <group ref={groupRef} position={[x, y, z]}>
            {children}
            <Annotation targetRef={groupRef} position={[aX, aY, aZ]} style={annotationStyle}>
                <div className='skill-display'>
                    <h3>{skillName}</h3>
                    <div className='level'>
                        <div className='level-indicator' style={{width: `${skillLevel}%`, backgroundColor: '#575757'}}>{skillLevel}</div>
                    </div>
                </div>

            </Annotation>
        </group>
    </Float>
  )
}

export default Skill