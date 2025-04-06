import React from '@3dmodels/React';
import './styles.css';
import {
  AccumulativeShadows,
  RandomizedLight,
  Text3D,
  useTexture,
  Edges,
} from '@react-three/drei';
import Skill from './Skill';
import CustomShapewTex from './CustomShapewTex';
import { usePortalTransition } from '@contexts/portalTransitionContext';

// lang, tech, design
const SkillsCard = ({
  skills = [
    { name: 'React', level: '60' },
    { name: 'React', level: '80' },
  ],
}) => {
  const { currentPortal } = usePortalTransition();
  const htmlTexture = useTexture('./img/html.png');
  const cssTexture = useTexture('./img/css.png');
  const jsTexture = useTexture('./img/js.png');
  const threeTexture = useTexture('./img/three.png');
  const blendValue = currentPortal ? 7 : 1.73;
  const annotationStyle = {
    transition: 'all 1s',
    opacity: currentPortal === 'tech' ? 1 : 0,
  };

  return (
    <>
      <Text3D
        font="./fonts/Inter_Bold.json"
        position={[-2, -1.6, -9.5]}
        castShadow
        receiveShadow
      >
        Tech
        <meshStandardMaterial color={'#f5fefd'} />
        <Edges linewidth={1} threshold={15} color={'black'} />
      </Text3D>
      <Skill
        groupPosition={[2, 0, -5]}
        annotationPosition={[5, 1.2, -5.5]}
        annotationStyle={annotationStyle}
        skillName={skills[0].name}
        skillLevel={skills[0].level}
      >
        <React scale={0.2} rotation={[0, -0.5, 0]} />
      </Skill>
      <Skill
        groupPosition={[0, 0.5, -5]}
        annotationPosition={[-0.5, 2.2, -5.5]}
        annotationStyle={annotationStyle}
        skillName={skills[1].name}
        skillLevel={skills[1].level}
      >
        <CustomShapewTex
          meshRot={[0, 0.3, -0.2]}
          materialColor="#F0DB4F"
          materialTexture={jsTexture}
          boxArgs={[0.7, 0.7, 0.1]}
        />
      </Skill>
      <Skill
        groupPosition={[-1.7, 0.5, -5.3]}
        annotationPosition={[6.4, 4, -5.5]}
        annotationStyle={annotationStyle}
        skillName={skills[2].name}
        skillLevel={skills[2].level}
      >
        <CustomShapewTex
          meshRot={[0.5, 0.3, 0]}
          materialColor="#36454F"
          materialTexture={htmlTexture}
          boxArgs={[0.7, 0.7, 0.1]}
        />
      </Skill>
      <Skill
        groupPosition={[1, 1.8, -5.2]}
        annotationPosition={[-5, -2, -5.5]}
        annotationStyle={annotationStyle}
        skillName={skills[3].name}
        skillLevel={skills[3].level}
      >
        <CustomShapewTex
          meshRot={[0.5, 0.3, 0]}
          materialColor="#36454F"
          materialTexture={cssTexture}
          boxArgs={[0.7, 0.7, 0.1]}
        />
      </Skill>
      <Skill
        groupPosition={[-0.5, -1.5, -5.2]}
        annotationPosition={[-2.8, -2, -5.5]}
        annotationStyle={annotationStyle}
        skillName={skills[4].name}
        skillLevel={skills[4].level}
      >
        <CustomShapewTex
          meshRot={[0.5, 0.3, 0]}
          materialColor="#36454F"
          materialTexture={threeTexture}
          boxArgs={[0.7, 0.7, 0.1]}
        />
      </Skill>
      <AccumulativeShadows
        temporal
        frames={50}
        color="#f5fefd"
        colorBlend={blendValue}
        toneMapped={true}
        alphaTest={0.7}
        opacity={0.5}
        scale={20}
        position={[0, -1.6, -9.4]}
      >
        <RandomizedLight
          intensity={Math.PI}
          amount={8}
          radius={4}
          ambient={0.5}
          position={[5, 5, -2]}
          bias={0.001}
        />
      </AccumulativeShadows>
    </>
  );
};

export default SkillsCard;
