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

const Portal = ({skillSetName = 'techno\nlogies', skills, active, setActive, ...props}) => {
    const x = useControls('Light', {
        positionX: { value: 0, min: -50, max: 50, step: 1},
        positionY: { value: 0, min: -50, max: 50, step: 1},
        positionZ: { value: 0, min: -50, max: 50, step: 1},
    })
    const groupRef = useRef<THREE.Group>(null);
    const ref = useRef<THREE.Mesh>(null);    
    const portalRef = useRef<THREE.ShaderMaterial>(null);
    const currentInfo = skillSetName === 'tech' ? <SkillsCard skills={skills} portalRef={portalRef} active={active}/> : 
                    skillSetName === 'aboutMe' ? <AboutMeCard info={skills} active={active} portalRef={portalRef}/> : skillSetName === 'projects' ?
                    <ProjectsCard active={active} info={skills}/> : skillSetName === 'design' ? <DesignCard active={active} info={skills} /> :
                    skillSetName === 'softSkills' ? <SoftSkillsCard active={active} info={skills} /> : null;     
    const isDisabled = active !== '' && active === skillSetName;     

    useFrame((_state, delta) => {
        if (portalRef.current) {
            const worldOpen = active === skillSetName;                      
            easing.damp(portalRef.current, "blend", worldOpen ? 1 : 0, 0, delta);
        }        
    })
    
    const handleDoubleClick = (e: Event) => {
        e.stopPropagation();        
        if (active !== '') {            
            setActive('');                        
            return;
        }

        const activeState = active === skillSetName ? '' : skillSetName;        
        setActive(activeState);                      
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