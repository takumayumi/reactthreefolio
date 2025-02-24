/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect } from "react";
import { Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CameraControls, Loader, Section } from "../components";
import { Fox } from "../models";

const Welcome = () => {
  return (
    <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2">
      <Section className="flex h-full w-full flex-col justify-between text-center font-welcome">
        <h1 className="body">Hi! My name is Yumi.</h1>
        <p>I am a Front-End Developer.</p>
      </Section>
    </div>
  );
};

const Home = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <>
      <Welcome />
      <Canvas
        camera={{ position: [0, 5, 10], near: 0.1, far: 100 }}
        className="relative z-0 h-full w-full overflow-hidden pt-24 before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-vignette before:content-['']"
      >
        <Suspense fallback={<Loader />}>
          {/* Lights */}
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <hemisphereLight
            skyColor="#FFFFFF"
            groundColor="#FFFFFF"
            intensity={1}
          />

          {/* Ground */}
          <Plane
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -2, 0]}
            args={[100, 100]}
          >
            <shadowMaterial opacity={0.3} />
          </Plane>

          {/* Fox */}
          <Fox
            castShadow
            // mousePos={mousePos}
            mousePos={{ x: -0.25, y: 0 }}
            receiveShadow
            scale={[0.6, 0.6, 0.6]}
          />

          {/* Camera */}
          <CameraControls
            enableZoom
            enablePan
            enableDamping
            dampingFactor={0.25}
            rotateSpeed={0.4}
          />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Home;
