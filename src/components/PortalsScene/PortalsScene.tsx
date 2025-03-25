import { Environment, Html } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import './style.css';
import Carousel from '../Carousel/Carousel'
import Heart from '../3dmodels/Heart'

const PortalsScene = () => {
  const {camera} = useThree();

  useEffect(() => {
    camera.position.z = -15;
  }, [camera])

  return (
    <>
      <Heart scale={1.5} position={[0, -1, 0]} name={'heart'}/>
      <ambientLight intensity={0.5} />       
      <Environment preset="dawn" background blur={0.5} />         
      <Carousel />                           
    </>
  )
}

export default PortalsScene