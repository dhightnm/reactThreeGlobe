import { Suspense, useRef } from "react";
import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as three from "three";
import "./styles.css";

const Cube = () => {
    const cube = useRef<three.Mesh>(null);
    const textureEarth = useLoader(TextureLoader, '2k_earth_daymap.jpg')


    useFrame(() => {
        // cube.current!.rotation.x += 0.007;
        cube.current!.rotation.y += 0.001;
    });

    return (
        <mesh ref={cube}>
            <sphereBufferGeometry args={[1, 15, 15]} />
            <meshStandardMaterial color="#0391BA" map={textureEarth}/>
        </mesh>
    );
};

const Scene = () => {

    return (
        <>
            <gridHelper />
            <axesHelper />
            <pointLight intensity={1.0} position={[5, 3, 5]} />
            <Cube />
        </>
    );
};

const App = () => {
    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
            }}
        >
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
