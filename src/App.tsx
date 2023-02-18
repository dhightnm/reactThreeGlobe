import * as THREE from 'three';
import { createRoot } from 'react-dom/client';
import React, {Suspense, useRef } from 'react';
import { Stats, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import './App.css';

function Cube1(props: ThreeElements['mesh']) {
    const cube = useRef<THREE.Mesh>();

    useFrame(() => {
        cube.current!.rotation.x += 0.01;
        cube.current!.rotation.y += 0.01;
    });
  return (
      <mesh>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#0391BA" />
      </mesh>
  );
};

const Scene = () => {
    return (
        <>
            <gridHelper />
            <axesHelper />
            <pointLight intensity={1.0} position={[5, 3, 5]} />
            <Cube1 />
        </>
    );
};

function App() {
    return (
        <div>
            <Canvas
                camera={{
                    near: 0.1,
                    far: 1000,
                    zoom: 1,
                }}
                onCreated={({ gl }) => {
                    gl.setClearColor("#252934");
                }}
            >
                <Stats />
                <OrbitControls />
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default App;
