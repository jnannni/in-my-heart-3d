import * as THREE from 'three';

// a componet to create a box with texture of a skill (only for those that do not have a 3d model on sketchfab)
const CustomShapewTex = ({
  meshRot: [meshX, meshY, meshZ] = [0.5, 0.3, 0],
  materialColor = 'black',
  materialTexture = new THREE.TextureLoader().load('./img/html.png'),
  boxArgs: [x, y, z] = [0.7, 0.7, 0.1],
}) => {
  const materials = [
    new THREE.MeshStandardMaterial({ color: materialColor }), // Front
    new THREE.MeshStandardMaterial({ color: materialColor }), // Back
    new THREE.MeshStandardMaterial({ color: materialColor }), // Top
    new THREE.MeshStandardMaterial({ color: materialColor }), // Bottom
    new THREE.MeshStandardMaterial({ map: materialTexture }), // Right
    new THREE.MeshStandardMaterial({ color: materialColor }), // Left
  ];

  return (
    <mesh rotation={[meshX, meshY, meshZ]} material={materials}>
      <boxGeometry args={[x, y, z]} />
    </mesh>
  );
};

export default CustomShapewTex;
