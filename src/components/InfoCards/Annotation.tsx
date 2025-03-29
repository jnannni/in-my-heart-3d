import { useRef } from 'react';
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'

interface AnnotationProps {
  style?: React.CSSProperties, 
  targetRef: React.RefObject<THREE.Object3D>;
  position: [number, number, number];
  children: React.ReactNode;
}
const Annotation = ({style={}, targetRef, position, children}: AnnotationProps) => {
  const annotationRef = useRef<HTMLDivElement | null>(null);
  const worldPos = new THREE.Vector3();
  const worldQuat = new THREE.Quaternion();

  useFrame(() => {
    if (targetRef.current && annotationRef.current) {
      targetRef.current.getWorldPosition(worldPos);
        targetRef.current.getWorldQuaternion(worldQuat);

        worldPos.add(new THREE.Vector3(...position).applyQuaternion(worldQuat)); // Apply rotation-aware offset

        annotationRef.current.style.transform = `translate3d(${worldPos.x}px, ${-worldPos.y}px, ${worldPos.z}px)`;
    }
  });
  
  return (
    <Html 
    ref={annotationRef}   
    transform    
    occlude='blending'
    geometry
    position={position}
    >
        <div className="annotation" style={style}>
            {children}
        </div>        
    </Html>
  )
}

export default Annotation