import { useRef } from 'react'
import * as THREE from 'three'

const Marker = ({ ...props}) => {
    const group = useRef<THREE.Group>(null);
  return (
    <group ref={group} {...props}>
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