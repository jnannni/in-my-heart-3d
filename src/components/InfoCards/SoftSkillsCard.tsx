import { Text3D, Edges, RandomizedLight, AccumulativeShadows, Float } from "@react-three/drei"
import Avatar from "../3dmodels/Avatar";

const SoftSkillsCard = ({active='', info = [{info: '', coord: [0, 0, 0] as [number, number, number]}]}) => {
    const blendValue = active ? 5 : 1.5;
    const opacity = active ? 1 : 0.5;
  return (
    <>
        <Text3D
            font='./fonts/Inter_Bold.json'        
            position={[-3, -1.6, -9.5]}
            castShadow
            receiveShadow>
            Soft Skills
            <meshStandardMaterial color={'#f5fefd'} />
            <Edges linewidth={1} threshold={15} color={"black"} />
        </Text3D>
        <Avatar position={[0,-1.6, -9]} scale={3} />
        {info.map((item, index) => {            
            return (
                <Float floatIntensity={0.2} rotationIntensity={0.2}>
                    <Text3D
                    key={index}
                    font='./fonts/Inter_Bold.json'        
                    position={item.coord}                    
                    scale={0.2}
                    curveSegments={32}
                    bevelEnabled
                    bevelSize={0.04}
                    bevelThickness={0.1}
                    height={0.5}
                    lineHeight={0.5}
                    letterSpacing={-0.06}>
                    {item.info}
                    <meshStandardMaterial />
                    </Text3D>
                </Float>                
        )})}
        <AccumulativeShadows temporal frames={50} color='#f5fefd' colorBlend={blendValue} toneMapped={true} alphaTest={0.5} opacity={opacity} scale={40} position={[0, -1.6, -9.45]}>
            <RandomizedLight intensity={Math.PI} amount={8} radius={4} ambient={0.5} position={[5, 5, -2]} bias={0.001} />
        </AccumulativeShadows>
    </>
  )
}

export default SoftSkillsCard