import { CameraControls, PerspectiveCamera } from "@react-three/drei"
import Portal from "../PortalsScene/Portal"
import { useEffect, useState, useRef } from "react"
import * as THREE from 'three'
import { useFrame, useThree } from "@react-three/fiber"

const tech = [
    {name: 'React', level: '85'},
    {name: 'JS', level: '85'},
    {name: 'HTML', level: '100'},
    {name: 'CSS', level: '95'},
    {name: 'Three.js', level: '35'}
]

const aboutMe = [
  {event: '24 years ago...', location: 'Zheleznogorsk', date: '25/09/2000'},
  {event: 'Bachelor', location: 'Saint-Petersburg', date: '09.2017-08.2021', info: 'Computer Science\nGPA: 1.6'},
  {event: 'Master', location: 'Weimar', date: '10.2021-09.2024', info: 'Human-Computer\nInteraction, GPA: 1.3'},
  {event: 'Master Thesis Intern, UX', location: 'Rober Bosch, Renningen', date: '10.2023-05.2024', info: ''},
]

const softSkills = [
    {info: 'Speaking business-fluent English', coord: [-2.5, -1.6, -6.5]},
    {info: 'My mother tongue is Russian', coord: [-1.4, 1, -6.5]},
    {info: 'Speaking B1 German', coord: [0.9, 0.5, -6.5]},
    {info: 'Team-player', coord: [2, 1.5, -6.5]},
    {info: 'Creativity is my second name', coord: [1.4, -0.5, -6.5]},
    {info: 'Fast learner', coord: [-2, 0.3, -6.5]},    
]

const design = [
  {name: 'Interaction Design', coord: [-2.5, -1.6, -6.5]},
  {name: 'UX Design', coord: [-1.4, 1, -6.5]},
  {name: 'User Research', coord: [0.9, 0.5, -6.5]},
  {name: 'UI Design', coord: [2, 1.5, -6.5]},
  {name: 'User Texting', coord: [1.4, -0.5, -6.5]},
  {name: 'Usability Texting', coord: [-2, 0.3, -6.5]},
  {name: 'Design Thinking', coord: [-3, -1, -6.5]}
]

const projects = [
  {name: 'Mars Survival Index', description: '', skills: 'Typescript, React, HTML, CSS, Figma', link: 'https://jnannni.github.io/mars-survival-index/'},
  {name: 'Concept Design of Smart Home app', description: '', skills: 'UX Design, User research,\nUsability Testing, Figma', link: 'https://jnannni.github.io/mars-survival-index/'},
  {name: 'Hanoi Tower', description: '', skills: 'TypeScript, HTML, CSS, PixelArt', link: 'https://github.com/jnannni/Hanoi_Tower/deployments/github-pages'}
]

const skillSet = {
    tech: tech,
    aboutMe: aboutMe,
    softSkills: softSkills,
    design: design,
    projects: projects
}
const Carousel = ({skillsName = '', skills = [{name: 'React', level: '60'}, {name: 'React', level: '80'}]}) => {
  const skillSetLength = Object.keys(skillSet).length;
  const radius = 4;
  const [active, setActive] = useState('');
  const { scene } = useThree();
  const controlsRef = useRef<CameraControls>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [prevCameraPos, setPrevCameraPos] = useState(new THREE.Vector3(0,0,-15));

  useEffect(() => {            
    if (active !== '') {                             
      const targetPosition = new THREE.Vector3(); 
      const cameraPosition = new THREE.Vector3();
      controlsRef.current?.getPosition(cameraPosition); 
      setPrevCameraPos(cameraPosition);

      const portal = scene.getObjectByName(active);
      if (portal) {
        portal.getWorldPosition(targetPosition);
        const portalDirection = targetPosition.clone().normalize().multiplyScalar(0.1);
        const newCameraPosition = targetPosition.clone().sub(portalDirection);        
        controlsRef.current?.setLookAt(newCameraPosition.x, newCameraPosition.y, newCameraPosition.z, 0, 0, 0, true);
      }      
    } else controlsRef.current?.setLookAt(prevCameraPos.x, 0, prevCameraPos.z, 0, 0, 0, true);
  }, [active]);
  

  return (
    <>
    {Object.entries(skillSet).map(([key, value], i) => {
      return (
        <Portal key={key} skillSetName={key} skills={value} active={active} setActive={setActive}
        position={[Math.sin((i / skillSetLength) * Math.PI * 2) * radius, 0, Math.cos((i / skillSetLength) * Math.PI * 2) * radius]}         
        rotation={[0, (i / skillSetLength) * Math.PI * 2, 0]}
        />
      )
    })} 
    <CameraControls ref={controlsRef} smoothTime={0.5} maxPolarAngle={Math.PI / 2} minPolarAngle={0}/>
    </>
  )
}

export default Carousel