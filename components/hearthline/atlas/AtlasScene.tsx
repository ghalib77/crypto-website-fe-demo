"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { contour, nodes } from "@/lib/hearthline/atlas-model";
type Props = {
  stage: number;
  active: boolean;
  narrow: boolean;
  onReady: () => void;
  onFailure: () => void;
};
// The renderer owns this mutable camera; update it only after a size change.
function fitCamera(camera: THREE.Camera, zoom: number) {
  if (camera instanceof THREE.OrthographicCamera) {
    camera.zoom = zoom;
    camera.updateProjectionMatrix();
  }
}
function Landscape({ stage, active, narrow, onReady, onFailure }: Props) {
  const group = useRef<THREE.Group>(null);
  const phase = useRef(0);
  const reported = useRef(false);
  const readyFrame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(readyFrame.current), []);
  const { gl, invalidate, camera, size, pointer } = useThree();
  useEffect(() => {
    fitCamera(camera, Math.min(narrow ? 44 : 64, size.width / 7.3));
    invalidate();
  }, [camera, size.width, narrow, invalidate]);
  useEffect(() => {
    const reset = () => pointer.set(0, 0);
    gl.domElement.addEventListener("pointerleave", reset);
    return () => gl.domElement.removeEventListener("pointerleave", reset);
  }, [gl, pointer]);
  const contours = useMemo(() => {
    const points: number[] = [];
    for (let layer = 0; layer < (narrow ? 2 : 3); layer++)
      for (let ring = 0; ring < 12; ring++) {
        const line = contour(layer, ring);
        for (let i = 1; i < line.length; i++)
          points.push(...line[i - 1], ...line[i]);
      }
    return new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points, 3),
    );
  }, [narrow]);
  const path = useMemo(
    () =>
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(nodes.map((p) => new THREE.Vector3(...p))),
        64,
        0.015,
        5,
        false,
      ),
    [],
  );
  useEffect(() => () => contours.dispose(), [contours]);
  useEffect(() => () => path.dispose(), [path]);
  useEffect(() => {
    invalidate();
  }, [stage, active, narrow, invalidate]);
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  useFrame((state, delta) => {
    if (!reported.current) {
      reported.current = true;
      readyFrame.current = requestAnimationFrame(onReady);
    }
    if (active && group.current) {
      phase.current += Math.min(delta, 0.05);
      group.current.position.y = Math.sin(phase.current * 0.3) * 0.045;
      const pointer = !narrow && matchMedia("(pointer:fine)").matches;
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        pointer ? state.pointer.x * 0.035 : 0,
        4,
        delta,
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        pointer ? state.pointer.y * 0.02 : 0,
        4,
        delta,
      );
      invalidate();
    }
  });
  return (
    <group ref={group}>
      <lineSegments geometry={contours}>
        <lineBasicMaterial color="#8a9e8e" transparent opacity={0.38} />
      </lineSegments>
      <mesh geometry={path}>
        <meshBasicMaterial color="#d58a62" />
      </mesh>
      {nodes.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh>
            <sphereGeometry args={[stage === i ? 0.115 : 0.075, 16, 12]} />
            <meshStandardMaterial
              color={stage === i ? "#efb48e" : "#8b9b8c"}
              roughness={0.65}
            />
          </mesh>
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.4, 6]} />
            <meshBasicMaterial color="#84968a" />
          </mesh>
          <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.14, stage === i ? 0.21 : 0.16, 32]} />
            <meshBasicMaterial
              color={stage === i ? "#d58a62" : "#84968a"}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
export default function AtlasScene(props: Props) {
  return (
    <Canvas
      orthographic
      camera={{
        position: [0, 6, 9],
        zoom: props.narrow ? 44 : 64,
        near: 0.1,
        far: 100,
      }}
      dpr={props.narrow ? 1 : 1.5}
      frameloop="demand"
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      fallback={null}
      onCreated={({ gl, camera }) => {
        camera.lookAt(0, 0, 0);
        gl.setClearColor("#111715", 0);
      }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[2, 5, 3]} intensity={2} />
      <Landscape {...props} />
    </Canvas>
  );
}
