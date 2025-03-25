import { Text3D, Edges, AccumulativeShadows, RandomizedLight, Html, Text, Billboard } from "@react-three/drei"
import Earth from "../3dmodels/Earth";
import { events } from "@react-three/fiber";

const AboutMeCard = ({active='', info = [{event: '', location: '', date: '', info: ''}], portalRef}) => {
    const blendValue = active ? 7 : 1.5;
    const annotationStyle = {
        transition: 'all 1s',
        opacity: active === 'aboutMe' ? 1 : 0,        
    }
    
  return (
    <>
        <Text3D
        font='./fonts/Inter_Bold.json'        
        position={[-2.5, -1.6, -9.5]}
        castShadow
        receiveShadow>
            About Me
            <meshStandardMaterial color={'#f5fefd'} />
            <Edges linewidth={1} threshold={15} color={"black"} />
        </Text3D>        
        <Earth position={[0, 0, -7]} rotation={[0, 1.3 * Math.PI, 0]} scale={0.8} info={info}/>
        <Text fillOpacity={active ? 1 : 0} color={'black'} fontSize={0.2} position={[1.4, 0.8, -6.4]} lineHeight={1} fontWeight={600} font="./fonts/Silkscreen-Regular.ttf">
            {`${info[0].event}\n${info[0].location}\n${info[0].date}\n`}
        </Text> 
        <Text fillOpacity={active ? 1 : 0} color={'black'} fontSize={0.2} position={[-1.1, 1.3, -6.4]} lineHeight={1} fontWeight={600} font="./fonts/Silkscreen-Regular.ttf">
            {`${info[1].event}\n${info[1].location}\n${info[1].date}\n${info[1].info}`}
        </Text> 
        <Text fillOpacity={active ? 1 : 0} color={'black'} fontSize={0.2} position={[-2.2, -0.1, -6.4]} lineHeight={1} fontWeight={600} font="./fonts/Silkscreen-Regular.ttf" textAlign="right">
            {`${info[2].event}\n${info[2].location}\n${info[2].date}\n${info[2].info}`}
        </Text> 
        <Text fillOpacity={active ? 1 : 0} color={'black'} fontSize={0.2} position={[-2.5, -1.0, -6.4]} lineHeight={1} fontWeight={600} font="./fonts/Silkscreen-Regular.ttf" textAlign="right">
            {`${info[3].event}\n${info[3].location}\n${info[3].date}`}
        </Text>                                     
        <AccumulativeShadows temporal frames={50} color='#f5fefd' colorBlend={blendValue} toneMapped={true} alphaTest={0.7} opacity={0.5} scale={20} position={[0, -1.6, -9.4]}>
            <RandomizedLight intensity={Math.PI} amount={8} radius={4} ambient={0.5} position={[5, 5, -2]} bias={0.001} />
        </AccumulativeShadows>
    </>
  )
}

export default AboutMeCard