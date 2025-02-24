/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const CameraControls = ({ ...props }) => {
  const controlsRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    controlsRef.current.update();
  });

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      {...props}
    />
  );
};

export default CameraControls;
