import { Html } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const Marker = ({parentRef, setHovered, ...props}) => {
    const group = useRef<THREE.Group>(null);

    // useEffect(() => {
    //     if (parentRef?.current && group.current) {
    //         // Convert local position to world position
    //         const worldPosition = new THREE.Vector3(...props.position);
    //         parentRef.current.localToWorld(worldPosition);
    //         group.current.position.copy(worldPosition);
    //       }
    // })
  return (
    <group ref={group} {...props} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <mesh rotation={[0, 0, 0]}>
            <coneGeometry args={[0.15, 0.3, 32]} />
            <meshBasicMaterial color="darkred" />
        </mesh>

        {/* Optional: Sphere at the base */}
        <mesh position={[0, -0.146, 0]} rotation={[0, 0, Math.PI]} scale={2}>
            <sphereGeometry args={[0.076, 16, 16, 0, Math.PI * 2., 0, Math.PI / 2]} />
            <meshBasicMaterial color="darkred" />
        </mesh>
        </group>
  )
}

export default Marker