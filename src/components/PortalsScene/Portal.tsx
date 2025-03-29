import { Environment, RoundedBox, MeshPortalMaterial, Edges} from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import SkillsCard from '@infoCards/SkillsCard'
import { easing } from 'maath'
import AboutMeCard from '@infoCards/AboutMeCard'
import ProjectsCard from '@infoCards/ProjectsCard'
import DesignCard from '@infoCards/DesignCard'
import SoftSkillsCard from '@infoCards/SoftSkillsCard'
import { usePortalTransition } from '@contexts/portalTransitionContext'

type DataType = 
| { name: string; level: string }[]
| { event: string; location: string; date: string; info?: string }[]
| { name: string; description: string; skills: string; link: string }[]
| { name: string; coord: [number, number, number] }[]
| { info: string; coord: [number, number, number] }[];

interface PortalProps {
    skillSetName: string;
    skills: DataType;
}

const Portal = ({skillSetName = 'techno\nlogies', skills = [], ...props}: PortalProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const {currentPortal, setCurrentPortal} = usePortalTransition();    
    const portalRef = useRef<THREE.ShaderMaterial>(null);
    const currentInfo = skillSetName === 'tech' ? <SkillsCard skills={skills as { name: string; level: string }[]} /> : 
                    skillSetName === 'aboutMe' ? <AboutMeCard info={skills as { event: string; location: string; date: string; info: string }[]} /> : skillSetName === 'projects' ?
                    <ProjectsCard info={skills as { name: string; description: string; skills: string; link: string }[]}/> : skillSetName === 'design' ? 
                    <DesignCard info={skills as { name: string; coord: [number, number, number] }[]} /> :
                    skillSetName === 'softSkills' ? <SoftSkillsCard info={skills as { info: string; coord: [number, number, number] }[]} /> : null;     
    const isDisabled = currentPortal !== '' && currentPortal === skillSetName; 

    useFrame((_state, delta) => {
        if (portalRef.current) {
            const worldOpen = currentPortal === skillSetName;                      
            easing.damp(portalRef.current, "blend", worldOpen ? 1 : 0, 0, delta);
        }        
    })
    
    const handleDoubleClick = (e: Event) => {
        e.stopPropagation();        
        if (currentPortal !== '') {            
            setCurrentPortal('');                        
            return;
        }

        const activeState = currentPortal === skillSetName ? '' : skillSetName;        
        setCurrentPortal(activeState);                      
    }

  return (
    <group ref={groupRef} {...props}>
        <group>
            <RoundedBox args={[3, 3, 0.1]} name={skillSetName} onDoubleClick={isDisabled ? undefined : handleDoubleClick}>                      
                <MeshPortalMaterial ref={portalRef} side={THREE.DoubleSide}>
                    <group>                                          
                        <ambientLight intensity={0.5} />                             
                        <Environment preset='city' />
                        {/* <rectAreaLight width={30} height={100} position={[-3, -4, -16]} intensity={2} lookAt={[0,0,0]}/>               */}
                        {/* <Environment preset="city"> 
                            <Lightformer ref={ref} intensity={1} form="ring" color="red" rotation-y={Math.PI / 2} position={[-1, 7, -3]} scale={[10, 10, 1]} />
                        </Environment>  */}
                        {currentInfo}                           
                    </group>
                </MeshPortalMaterial>        
            </RoundedBox>
            <RoundedBox args={[3.2, 3.2, 0.1]} position-z={-0.01}>
                <meshStandardMaterial color="gray" />
                <Edges>
                <lineBasicMaterial color='black' />
                </Edges>
            </RoundedBox>
        </group>
    </group>
  )
}

export default Portal