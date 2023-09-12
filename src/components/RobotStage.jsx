import { CameraControls, Environment, useCursor, useAspect } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MonsterCard } from "./MonsterCard";
import { George } from "./models/George";
import { Stan } from "./models/Stan";
import { Mike } from "./models/Mike";

export const RobotStage = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);

  useCursor(hovered);

  useEffect(() => {
    //handling camera active
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(0, 0, 5, targetPosition.x, targetPosition.y, targetPosition.z, true);
      setHovered(null);
    } else {
      //handling camera reset
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls ref={controlsRef} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} minDistance={3} maxDistance={8} />

      <MonsterCard
        name="George"
        color="#6F9273"
        texture={"textures/Digital_Painting_equirectangular-jpg_robot_green_world_futuristic_82863584.jpg"}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <George scale={0.37} position={[0, -1, 0]} hovered={hovered === "George"} />
      </MonsterCard>

      <MonsterCard
        texture={"textures/Anime_equirectangular-jpg_robot_world_futuristic_1200170811.jpg"}
        name="Stan"
        color={"#c47740"}
        position={[-2.5, 0, 0]}
        rotation={[0, Math.PI / 8, 0]}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Stan scale={0.35} position={[0, -1, 0]} hovered={hovered === "Stan"} />
      </MonsterCard>

      <MonsterCard
        name="Mike"
        color="#769b9e"
        texture={"textures/Anime_equirectangular-jpg_cyberpunk_world_1929197758.jpg"}
        position={[2.5, 0, 0]}
        rotation={[0, -Math.PI / 8, 0]}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Mike scale={0.35} position={[0, -1, 0]} hovered={hovered === "Mike"} />
      </MonsterCard>
    </>
  );
};
