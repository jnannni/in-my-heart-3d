import { Float, Text, useCursor } from '@react-three/drei';
import { useState } from 'react';
import { usePortalTransition } from '@contexts/portalTransitionContext';

interface ProjectProps {
  info: { name: string; description: string; skills: string; link: string };
  txtposition: [number, number, number];
  tipposition: [number, number, number];
  children: React.ReactNode;
}

const Project = ({
  info = { name: '', description: '', skills: '', link: '' },
  txtposition: [x, y, z] = [0, 0, 0],
  tipposition: [tX, tY, tZ] = [0, 0, 0],
  children,
}: ProjectProps) => {
  const [hovered, setHovered] = useState(false);
  const { currentPortal } = usePortalTransition();
  useCursor(hovered);
  const meshOpacity = hovered ? 0.5 : 0;
  const txtOpacity = hovered ? 1 : 0;
  const isDisabled = currentPortal !== '' && currentPortal === 'projects';

  const openLink = () => {
    window.open(info.link, '_blank')?.focus();
  };
  return (
    <Float floatIntensity={0.2} rotationIntensity={0.2}>
      <group
        onPointerOver={() => (isDisabled ? setHovered(true) : undefined)}
        onPointerOut={() => (isDisabled ? setHovered(false) : undefined)}
        onClick={() => (isDisabled ? openLink() : undefined)}
      >
        {children}
        <Text
          fillOpacity={currentPortal ? 1 : 0}
          color={'black'}
          fontSize={0.1}
          position={[x, y, z]}
          lineHeight={1}
          fontWeight={600}
          font="./fonts/Silkscreen-Regular.ttf"
        >
          {`${info.name}\n${info.description}\n${info.skills}`}
        </Text>
      </group>
      <group position={[tX, tY, tZ]}>
        <mesh>
          <planeGeometry args={[0.8, 0.3]} />
          <meshStandardMaterial
            color="#f5fefd"
            transparent={true}
            opacity={meshOpacity}
          />
        </mesh>
        <Text
          fillOpacity={txtOpacity}
          color="black"
          position={[0.02, 0.01, 0.1]}
          scale={0.05}
          lineHeight={1}
          fontWeight={600}
          font="./fonts/Silkscreen-Regular.ttf"
        >
          {info.link.includes('github')
            ? 'Open Project Demo'
            : 'Open Figma Prototype'}
        </Text>
      </group>
    </Float>
  );
};

export default Project;
