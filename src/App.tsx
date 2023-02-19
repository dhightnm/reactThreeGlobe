import { Suspense, useRef } from "react";
import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import {Stats, OrbitControls, useTexture, Stars} from "@react-three/drei";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from "three";
import "./styles.css";

const Cube = () => {
    const cube = useRef<THREE.Mesh>(null);
    const textureEarth = useLoader(TextureLoader, '2k_earth_daymap.jpg')


    useFrame(() => {
        // cube.current!.rotation.x += 0.007;
        cube.current!.rotation.y += 0.001;
    });

    return (
        <mesh ref={cube}>
            <sphereBufferGeometry args={[1, 32, 32]} />
            <meshStandardMaterial map={textureEarth}/>
        </mesh>
    );
};

// @ts-ignore
function Sphere() {
    const sphere = useRef<THREE.Mesh>(null);
    let posx =0
    let posy =0
    let posz =0
    // sphere.current!.position.x += posx;
    // sphere.current!.position.y += posy;
    // sphere.current!.position.z += posz;

    useFrame((state) => {
        // @ts-ignore
        sphere.current.position.set(
            Math.sin(state.clock.getElapsedTime() / 1.5) / 2 ,
            0,
            (Math.cos(state.clock.getElapsedTime() / 1.5) / .5)
        );
        // @ts-ignore
        sphere.current.rotation.set(
            Math.sin(state.clock.getElapsedTime() / 1.5) / 2 * 5,
            0,
            0
        );
    });



    return (
        <mesh ref={sphere}>
            <sphereGeometry args={[0.2, 30, 30]} />
            <meshStandardMaterial color='hotpink' />
        </mesh>
    );
}

const Scene = () => {
    return (
        <>
            <gridHelper />
            <axesHelper />
            <pointLight intensity={1.0} position={[5, 3, 5]} />
            <Sphere />
            {/*<Cube />*/}
        </>
    );
};

const App = () => {
    const backgroundStars = useLoader(TextureLoader, 'stars.jpg');
    backgroundStars.encoding = THREE.sRGBEncoding;
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
                onCreated={({ gl, scene }) => {
                    scene.background = backgroundStars;
                }}
            >
                <Stats />
                <OrbitControls />
                <Suspense fallback={null}>
                    <Stars depth={200}/>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default App;
