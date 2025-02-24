/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { a } from "@react-spring/three";

import glb from "../assets/3d/fox.glb";

const Fox = ({ mousePos, ...props }) => {
  const foxRef = useRef();
  const { animations, materials, nodes } = useGLTF(glb);
  const { actions } = useAnimations(animations, foxRef);

  useEffect(() => {
    actions["Animation"].play();
  }, [actions]);

  useFrame(() => {
    if (foxRef.current) {
      const { x, y } = mousePos;
      const maxRotationX = Math.PI / 4; // Adjust the maximum rotation angle on X-axis
      const maxRotationY = Math.PI / 4; // Adjust the maximum rotation angle on Y-axis

      const targetRotationX = x * maxRotationX;
      const targetRotationY = y * maxRotationY;

      // Smoothly interpolate towards the target rotations
      foxRef.current.rotation.x +=
        (targetRotationX - foxRef.current.rotation.x) * 0.05;
      foxRef.current.rotation.y +=
        (targetRotationY - foxRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <a.group ref={foxRef} {...props}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Star001_1">
                <mesh
                  name="Object_4"
                  geometry={nodes.Object_4.geometry}
                  material={materials["Material.007"]}
                />
                <mesh
                  name="Object_5"
                  geometry={nodes.Object_5.geometry}
                  material={materials["Material.010"]}
                />
                <mesh
                  name="Object_6"
                  geometry={nodes.Object_6.geometry}
                  material={materials["Material.011"]}
                />
              </group>
              <group name="Star004_2">
                <mesh
                  name="Object_8"
                  geometry={nodes.Object_8.geometry}
                  material={materials["Material.012"]}
                />
                <mesh
                  name="Object_9"
                  geometry={nodes.Object_9.geometry}
                  material={materials["Material.013"]}
                />
              </group>
              <group name="Cube_3">
                <mesh
                  name="Object_11"
                  geometry={nodes.Object_11.geometry}
                  material={materials.Material}
                />
                <mesh
                  name="Object_12"
                  geometry={nodes.Object_12.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  name="Object_13"
                  geometry={nodes.Object_13.geometry}
                  material={materials["Material.005"]}
                />
                <mesh
                  name="Object_14"
                  geometry={nodes.Object_14.geometry}
                  material={materials["Material.005"]}
                />
                <mesh
                  name="Object_15"
                  geometry={nodes.Object_15.geometry}
                  material={materials["Material.003"]}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </a.group>
  );
};

Fox.propTypes = {
  mousePos: PropTypes.object,
};

export default Fox;
