import { Canvas, useThree } from "@react-three/fiber";
import { MonsterStage } from "./components/MonsterStage";
import { RobotStage } from "./components/RobotStage";
import { useEffect, useState } from "react";
import { useGLTF, useTexture, Center, Decal, Text3D, OrbitControls } from "@react-three/drei";

function App() {
  const [pickStage, setPickStage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const over = (e) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);

  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);

  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
      {pickStage === "Robots" && <RobotStage />}

      {pickStage === "Monsters" && <MonsterStage />}

      {pickStage === null && (
        <>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} />
          <Center top left position={[0, 1, 1]}>
            <Text3D letterSpacing={-0.06} size={0.5} font="fonts/Inter_bold.json" onPointerOver={over} onPointerOut={out} onClick={() => setPickStage("Monsters")}>
              MONSTERS
              <meshStandardMaterial color="#FF0000" />
            </Text3D>
          </Center>
          <Center center rotation={[0, -Math.PI / 7, 0]}>
            <Text3D letterSpacing={-0.06} size={0.5} font="fonts/Inter_bold.json">
              OR
              <meshStandardMaterial color="#333333" />
            </Text3D>
          </Center>
          <Center bottom right position={[0, -1, 1]} rotation={[0, Math.PI / 7, 0]}>
            <Text3D letterSpacing={-0.06} size={0.5} font="fonts/Inter_bold.json" onPointerOver={over} onPointerOut={out} onClick={() => setPickStage("Robots")}>
              ROBOTS
              <meshStandardMaterial color="#0000FF" />
            </Text3D>
          </Center>
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
        </>
      )}
    </Canvas>
  );
}

export default App;
