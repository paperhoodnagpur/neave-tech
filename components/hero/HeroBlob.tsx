'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function Blob() {
  const mesh = useRef<THREE.Mesh>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, dt) => {
    if (!mesh.current) return;
    const { x, y } = state.pointer;
    target.current.x += (y * 0.35 - target.current.x) * 0.05;
    target.current.y += (x * 0.5 - target.current.y) * 0.05;
    mesh.current.rotation.x = target.current.x;
    mesh.current.rotation.y += dt * 0.18 + target.current.y * 0.01;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 64]} />
        {/* @ts-ignore drei material has its own props */}
        <MeshDistortMaterial
          color="#16C172"
          roughness={0.15}
          metalness={0.35}
          distort={0.45}
          speed={1.8}
          emissive="#0E8A4F"
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
}

export default function HeroBlob() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5.0], fov: 42 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 4]} intensity={1.2} />
        <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#3EE89C" />
        <Blob />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
