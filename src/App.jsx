import { Canvas } from "@react-three/fiber";
import { MonsterStage } from "./components/MonsterStage";
import { RobotStage } from "./components/RobotStage";
import { useState } from "react";

function App() {
  const [pickStage, SetPickStage] = useState(null);

  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
      <RobotStage />
      {/* <MonsterStage /> */}
    </Canvas>
  );
}

export default App;
