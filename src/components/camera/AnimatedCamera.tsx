import { useSpring } from '@react-spring/three';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

const AnimatedCamera = () => {
  const { camera } = useThree();

  const springs = useSpring({
    from: { position: [0, 0, -8] },
    to: { position: [0, 0, -2] },
    config: { duration: 1000 },
  });

  useFrame(() => {
    if (springs.position.get()) {
      camera.position.set(
        springs.position.get()[0],
        springs.position.get()[1],
        springs.position.get()[2],
      );
      camera.lookAt(0, 0, 4);
    }
  });
  return <PerspectiveCamera makeDefault />;
};

export default AnimatedCamera;
