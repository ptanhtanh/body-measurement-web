import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Center, ContactShadows } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { RotateCcw } from 'lucide-react';
import { API_BASE_URL } from '../services/api';

import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

const MeshModel = ({ url }) => {
    // Ensure URL is absolute
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
    const obj = useLoader(OBJLoader, fullUrl);

    const clonedObj = React.useMemo(() => {
        const clone = obj.clone();
        clone.traverse((child) => {
            if (child.isMesh) {
                if (child.geometry) {
                    // CRITICAL FIX 1: Clone the geometry so we don't mutate the cached useLoader asset
                    let geom = child.geometry.clone();

                    // CRITICAL FIX 2: Delete auto-generated normals so mergeVertices can weld the seams
                    geom.deleteAttribute('normal');
                    geom.deleteAttribute('uv');

                    // Weld coincident vertices
                    geom = BufferGeometryUtils.mergeVertices(geom, 1e-4);

                    // Recompute completely smooth normals
                    geom.computeVertexNormals();
                    child.geometry = geom;
                }

                // Professional material - softer slate with matte finish
                child.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color('#cbd5e1'), // Slate 300 - much lighter and brighter
                    roughness: 0.5,
                    metalness: 0.1,
                    side: THREE.DoubleSide
                });

                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        return clone;
    }, [obj]);

    return (
        <Center>
            {/* Real world scale is ~1.76m. Scale to 1.2 to fill the fov=40 camera viewport */}
            <primitive object={clonedObj} scale={1.2} />
        </Center>
    );
};

const BodyMeshViewer = ({ meshUrl }) => {
    const controlsRef = useRef();

    const handleReset = () => {
        if (controlsRef.current) {
            controlsRef.current.reset();
        }
    };

    return (
        <div className="relative w-full h-[750px] rounded-2xl overflow-hidden glass shadow-2xl group">
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <h3 className="text-white/80 font-medium px-3 py-1 bg-black/30 backdrop-blur-md rounded-full text-sm">
                    3D Reconstruction
                </h3>
            </div>

            <button
                onClick={handleReset}
                className="absolute bottom-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all border border-white/10"
                title="Reset Camera"
            >
                <RotateCcw size={20} />
            </button>

            <Canvas shadows camera={{ position: [0, 1.2, 3.5], fov: 40 }}>
                <color attach="background" args={['#0f172a']} />

                {/* 3-Point Lighting Setup for Professional Studio Look */}
                <ambientLight intensity={0.4} color="#ffffff" />

                {/* Key Light: Main illuminator */}
                <directionalLight
                    position={[3, 5, 5]}
                    intensity={1.2}
                    color="#ffffff"
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />

                {/* Fill Light: Soft cool light to fill shadows */}
                <directionalLight
                    position={[-4, 2, 4]}
                    intensity={0.6}
                    color="#93c5fd"
                />

                {/* Rim Light: Backlight for edge definition */}
                <directionalLight
                    position={[0, 4, -5]}
                    intensity={0.8}
                    color="#ffffff"
                />

                <Suspense fallback={null}>
                    {meshUrl && <MeshModel url={meshUrl} />}
                    {/* Soft Contact Shadow directly beneath the body.
                        Since scale=1.2 and height is ~1.76, the total visual height is ~2.11m.
                        Center sets the midpoint to Y=0, so the bottom is roughly at -1.05 */}
                    <ContactShadows
                        position={[0, -1.05, 0]}
                        opacity={0.6}
                        scale={5}
                        blur={2}
                        far={5}
                        resolution={256}
                        color="#000000"
                    />
                </Suspense>

                <OrbitControls
                    ref={controlsRef}
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    target={[0, 0, 0]}
                    makeDefault
                />
            </Canvas>

            {!meshUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm pointer-events-none">
                    <p className="text-white/40 font-light italic">
                        Waiting for inference results...
                    </p>
                </div>
            )}
        </div>
    );
};

export default BodyMeshViewer;

