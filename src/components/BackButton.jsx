import React, { useState } from 'react'
import { Text, useCursor } from "@react-three/drei";

function BackButton({color, onClick}) {
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);
  
  return (
    <Text
      font="fonts/Caprasimo-Regular.ttf"
      fontSize={0.2}
      position={[-1.5, 1, 0]}
      anchorX="left"
      anchorY="top"
      color={color}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      Go back
    </Text> 
  )
}

export default BackButton