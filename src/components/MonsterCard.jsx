import {
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useCursor,
  useTexture
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import BackButton from "./BackButton";

export const MonsterCard = ({children, texture, name, color, active, setActive, hovered, setHovered, ...props}) => {
  const map = useTexture(texture);
  const portalMaterial = useRef();

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
  });

  const handleClick = () => {
    if (!active) {
      setActive(name);
    }
  };

  const handleHover = () => {
    if (!active) {
      setHovered(name);
    }
  };

  const handleUnhover = () => {
    if (!active) {
      setHovered(null);
    }
  };
  
  return (
    <group {...props}>
      <Text
        font="fonts/Caprasimo-Regular.ttf"
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        anchorY={"bottom"}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
          {active &&
            <BackButton onClick={() => setActive(null)} color={color} />
          }
          {children}
          <mesh
            onClick={handleClick}
            onPointerOver={handleHover}
            onPointerOut={handleUnhover}
          >
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};