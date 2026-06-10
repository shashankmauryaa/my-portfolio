import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/*
  Procedural voxel character matching the pixel-art character.png:
  - Dark hair, light beard stubble
  - Medium skin tone
  - Black t-shirt
  - Blue jeans
  - White sneakers

  All built from box geometries — no external model files.
*/

// Color palette matching the character.png
const COLORS = {
  skin: '#d4956b',
  hair: '#1a1a1a',
  // beard: '#3a2a1a',
  shirt: '#1a1a1a',
  jeans: '#5b88a5',
  shoes: '#e8e8e8',
  shoeSole: '#666666',
  eyeWhite: '#ffffff',
  eyePupil: '#1a1a1a',
};

function VoxelBox({ position, size, color, castShadow = true, ...props }) {
  return (
    <mesh position={position} castShadow={castShadow} {...props}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
    </mesh>
  );
}

export default function Character3D({
  isWalking = false,
  facing = 'right',
  spinning = false,
  scale = 1,
}) {
  const groupRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const bodyBobRef = useRef();
  const timeRef = useRef(0);

  // Walk cycle parameters
  const WALK_SPEED = 8;
  const ARM_SWING = 0.7;
  const LEG_SWING = 0.6;
  const BOB_AMOUNT = 0.04;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Spinning mode (loading screen)
    if (spinning) {
      groupRef.current.rotation.y += delta * 6.0; // Increased spin speed
      // Gentle idle sway
      timeRef.current += delta;
      const sway = Math.sin(timeRef.current * 1.5) * 0.02;
      if (bodyBobRef.current) {
        bodyBobRef.current.position.y = Math.sin(timeRef.current * 2) * 0.01;
        bodyBobRef.current.rotation.z = sway;
      }
      return;
    }

    // Facing direction
    const targetRotY = facing === 'left' ? -Math.PI * 0.15 : Math.PI * 0.15;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.1;

    if (isWalking) {
      timeRef.current += delta * WALK_SPEED;
      const t = timeRef.current;

      // Leg swing
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = Math.sin(t) * LEG_SWING;
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = Math.sin(t + Math.PI) * LEG_SWING;
      }

      // Arm swing (opposite to legs)
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = Math.sin(t + Math.PI) * ARM_SWING;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = Math.sin(t) * ARM_SWING;
      }

      // Body bob
      if (bodyBobRef.current) {
        bodyBobRef.current.position.y = Math.abs(Math.sin(t * 2)) * BOB_AMOUNT;
        bodyBobRef.current.rotation.z = Math.sin(t) * 0.02;
      }
    } else {
      // Idle: smooth return to rest + subtle breathing
      timeRef.current += delta * 2;
      const t = timeRef.current;
      const ease = 0.08;

      if (leftLegRef.current) leftLegRef.current.rotation.x *= 1 - ease;
      if (rightLegRef.current) rightLegRef.current.rotation.x *= 1 - ease;
      if (leftArmRef.current) leftArmRef.current.rotation.x *= 1 - ease;
      if (rightArmRef.current) rightArmRef.current.rotation.x *= 1 - ease;

      if (bodyBobRef.current) {
        bodyBobRef.current.position.y = Math.sin(t) * 0.008;
        bodyBobRef.current.rotation.z *= 1 - ease;
      }
    }
  });

  // Unit = roughly 0.1 meters. Character is about 1.7 units tall.
  // Shifted down by -0.2 to center it vertically in the canvas so the head doesn't clip
  return (
    <group ref={groupRef} scale={scale} position={[0, -0.2, 0]}>
      <group ref={bodyBobRef}>
        {/* === HEAD === */}
        <group position={[0, 0.72, 0]}>
          {/* Head */}
          <VoxelBox position={[0, 0, 0]} size={[0.32, 0.32, 0.3]} color={COLORS.skin} />
          {/* Hair — top */}
          <VoxelBox position={[0, 0.14, -0.02]} size={[0.34, 0.1, 0.34]} color={COLORS.hair} />
          {/* Hair — back */}
          <VoxelBox position={[0, 0.04, -0.14]} size={[0.34, 0.22, 0.06]} color={COLORS.hair} />
          {/* Hair — left side */}
          <VoxelBox position={[-0.16, 0.06, -0.04]} size={[0.06, 0.18, 0.24]} color={COLORS.hair} />
          {/* Hair — right side */}
          <VoxelBox position={[0.16, 0.06, -0.04]} size={[0.06, 0.18, 0.24]} color={COLORS.hair} />
          {/* Beard/stubble */}
          <VoxelBox position={[0, -0.1, 0.12]} size={[0.2, 0.1, 0.08]} color={COLORS.beard} />
          {/* Eyes — left */}
          <VoxelBox position={[-0.08, 0.04, 0.15]} size={[0.06, 0.04, 0.02]} color={COLORS.eyeWhite} castShadow={false} />
          <VoxelBox position={[-0.07, 0.04, 0.16]} size={[0.03, 0.03, 0.02]} color={COLORS.eyePupil} castShadow={false} />
          {/* Eyes — right */}
          <VoxelBox position={[0.08, 0.04, 0.15]} size={[0.06, 0.04, 0.02]} color={COLORS.eyeWhite} castShadow={false} />
          <VoxelBox position={[0.07, 0.04, 0.16]} size={[0.03, 0.03, 0.02]} color={COLORS.eyePupil} castShadow={false} />
          {/* Eyebrows */}
          <VoxelBox position={[-0.08, 0.08, 0.15]} size={[0.08, 0.02, 0.02]} color={COLORS.hair} castShadow={false} />
          <VoxelBox position={[0.08, 0.08, 0.15]} size={[0.08, 0.02, 0.02]} color={COLORS.hair} castShadow={false} />
        </group>

        {/* === TORSO (black t-shirt) === */}
        <VoxelBox position={[0, 0.36, 0]} size={[0.38, 0.36, 0.22]} color={COLORS.shirt} />

        {/* === ARMS === */}
        {/* Left arm — pivot at shoulder */}
        <group position={[-0.24, 0.48, 0]} ref={leftArmRef}>
          {/* Sleeve (black) */}
          <VoxelBox position={[0, -0.06, 0]} size={[0.12, 0.12, 0.14]} color={COLORS.shirt} />
          {/* Forearm (skin) */}
          <VoxelBox position={[0, -0.2, 0]} size={[0.1, 0.18, 0.12]} color={COLORS.skin} />
          {/* Hand */}
          <VoxelBox position={[0, -0.32, 0]} size={[0.08, 0.06, 0.1]} color={COLORS.skin} />
        </group>

        {/* Right arm — pivot at shoulder */}
        <group position={[0.24, 0.48, 0]} ref={rightArmRef}>
          <VoxelBox position={[0, -0.06, 0]} size={[0.12, 0.12, 0.14]} color={COLORS.shirt} />
          <VoxelBox position={[0, -0.2, 0]} size={[0.1, 0.18, 0.12]} color={COLORS.skin} />
          <VoxelBox position={[0, -0.32, 0]} size={[0.08, 0.06, 0.1]} color={COLORS.skin} />
        </group>

        {/* === LEGS === */}
        {/* Left leg — pivot at hip */}
        <group position={[-0.1, 0.16, 0]} ref={leftLegRef}>
          {/* Thigh (jeans) */}
          <VoxelBox position={[0, -0.14, 0]} size={[0.14, 0.22, 0.16]} color={COLORS.jeans} />
          {/* Shin (jeans) */}
          <VoxelBox position={[0, -0.34, 0]} size={[0.13, 0.2, 0.15]} color={COLORS.jeans} />
          {/* Shoe */}
          <VoxelBox position={[0, -0.47, 0.03]} size={[0.14, 0.08, 0.2]} color={COLORS.shoes} />
          <VoxelBox position={[0, -0.51, 0.03]} size={[0.15, 0.02, 0.21]} color={COLORS.shoeSole} />
        </group>

        {/* Right leg — pivot at hip */}
        <group position={[0.1, 0.16, 0]} ref={rightLegRef}>
          <VoxelBox position={[0, -0.14, 0]} size={[0.14, 0.22, 0.16]} color={COLORS.jeans} />
          <VoxelBox position={[0, -0.34, 0]} size={[0.13, 0.2, 0.15]} color={COLORS.jeans} />
          <VoxelBox position={[0, -0.47, 0.03]} size={[0.14, 0.08, 0.2]} color={COLORS.shoes} />
          <VoxelBox position={[0, -0.51, 0.03]} size={[0.15, 0.02, 0.21]} color={COLORS.shoeSole} />
        </group>
      </group>

      {/* Ground shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.52, 0]} receiveShadow>
        <circleGeometry args={[0.25, 16]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}
