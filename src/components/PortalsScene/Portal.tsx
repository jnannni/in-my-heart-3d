import { Environment, MeshReflectorMaterial, Lightformer, RoundedBox, MeshPortalMaterial, Edges} from '@react-three/drei'
import { act, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Leva, useControls } from 'leva'
import { useFrame } from '@react-three/fiber'
import SkillsCard from '../InfoCards/SkillsCard'
import { easing } from 'maath'
import AboutMeCard from '../InfoCards/AboutMeCard'
import ProjectsCard from '../InfoCards/ProjectsCard'
import DesignCard from '../InfoCards/DesignCard'
import SoftSkillsCard from '../InfoCards/SoftSkillsCard'
import { usePortalTransition } from '../contexts/portalTransitionContext'

const Portal = ({skillSetName = 'techno\nlogies', skills, ...props}) => {
    const x = useControls('Light', {
        positionX: { value: 0, min: -50, max: 50, step: 1},
        positionY: { value: 0, min: -50, max: 50, step: 1},
        positionZ: { value: 0, min: -50, max: 50, step: 1},
    })
    const groupRef = useRef<THREE.Group>(null);
    const ref = useRef<THREE.Mesh>(null);
    const {currentPortal, setCurrentPortal} = usePortalTransition();    
    const portalRef = useRef<THREE.ShaderMaterial>(null);
    const currentInfo = skillSetName === 'tech' ? <SkillsCard skills={skills} /> : 
                    skillSetName === 'aboutMe' ? <AboutMeCard info={skills} portalRef={portalRef}/> : skillSetName === 'projects' ?
                    <ProjectsCard info={skills}/> : skillSetName === 'design' ? <DesignCard info={skills} /> :
                    skillSetName === 'softSkills' ? <SoftSkillsCard info={skills} /> : null;     
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