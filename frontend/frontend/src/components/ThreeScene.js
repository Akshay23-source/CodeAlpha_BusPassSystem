import { Canvas } from "@react-three/fiber";

function Box() {
  return (
    <mesh rotation={[10, 10, 0]}>
      <boxGeometry />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <Canvas>
      <ambientLight />
      <Box />
    </Canvas>
  );
}