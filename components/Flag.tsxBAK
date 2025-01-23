import {  MeshDistortMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Flag(props: any) {
  const colorMap = useLoader(TextureLoader, "/bg.jpg");

  return (
    <mesh {...props}>
      <boxGeometry args={[2, 1, 0.01]} />
    
      {/* <MeshDistortMaterial distort={0.5} speed={5}> */}
        <meshStandardMaterial map={colorMap} />
      {/* </MeshDistortMaterial> */}
    </mesh>
  );
}
