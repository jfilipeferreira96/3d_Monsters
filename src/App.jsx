import { Canvas } from "@react-three/fiber";
import { MonsterStage } from "./components/MonsterStage";

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
      <MonsterStage />
    </Canvas>
  );
}

export default App;
