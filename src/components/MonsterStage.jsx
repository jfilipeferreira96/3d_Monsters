import { CameraControls, Environment, useCursor, useAspect } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MonsterCard } from "./MonsterCard";
import { Orc } from "./models/Orc";
import { Tribal } from "./models/Tribal";
import { Fish } from "./models/Fish";

export const MonsterStage = () => {
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

      <MonsterCard name="Fish King" color="#38adcf" texture={"textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"} active={active} setActive={setActive} hovered={hovered} setHovered={setHovered}>
        <Fish scale={0.6} position={[0, -1, 0]} hovered={hovered === "Fish King"} />
      </MonsterCard>

      <MonsterCard
        texture={"textures/anime_art_style_lava_world.jpg"}
        name="Tribal"
        color={"#C25149"}
        position={[-2.5, 0, 0]}
        rotation={[0, Math.PI / 8, 0]}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Tribal scale={0.5} position={[0, -1, 0]} hovered={hovered === "Tribal"} />
      </MonsterCard>

      <MonsterCard
        name="Orc"
        color="#509F5D"
        texture={"textures/anime_art_style_cactus_forest.jpg"}
        position={[2.5, 0, 0]}
        rotation={[0, -Math.PI / 8, 0]}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Orc scale={0.55} position={[0, -1, 0]} hovered={hovered === "Orc"} />
      </MonsterCard>
    </>
  );
};
