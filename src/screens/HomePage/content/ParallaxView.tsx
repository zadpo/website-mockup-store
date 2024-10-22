"use client";

import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useIntersect, Image, ScrollControls, Scroll } from "@react-three/drei";

interface ItemProps {
  url: string;
  scale: [number, number, number];
  position: [number, number, number];
}

function Item({ url, scale, ...props }: ItemProps) {
  const visible = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hovered, hover] = useState(false);
  const ref = useIntersect(
    (isVisible) => (visible.current = isVisible)
  ) as React.MutableRefObject<THREE.Mesh>;
  const { height } = useThree((state) => state.viewport);

  useFrame((state, delta) => {
    if (ref.current && ref.current.position && ref.current.material) {
      ref.current.position.y = THREE.MathUtils.damp(
        ref.current.position.y,
        visible.current ? 0 : -height / 2 + 1,
        4,
        delta
      );
      // Removed zoom property as it does not exist on THREE.Material
      // Removed grayscale property as it does not exist on THREE.Material
    }
  });

  return (
    <group {...props}>
      <Image
        ref={ref}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        scale={[scale[0], scale[1]]}
        url={url}
      />
    </group>
  );
}

function Items() {
  const { width: w, height: h } = useThree((state) => state.viewport);
  const isMobile = w < 3; // Assuming width < 3 is mobile in Three.js units

  const scale = isMobile ? 0.7 : 1; // Reduce scale for mobile devices

  const items: ItemProps[] = [
    {
      url: "/uploads/bonaparte_canape-1920x1536.webp",
      scale: [(w / 3) * scale, (w / 3) * scale, 1],
      position: [(-w / 6) * scale, 0, 0],
    },
    {
      url: "/uploads/bonaparte_canape-1920x1536.webp",
      scale: [2 * scale, (w / 3) * scale, 1],
      position: [(w / 30) * scale, -h * scale, 0],
    },
    {
      url: "/uploads/bonaparte_canape-1920x1536.webp",
      scale: [(w / 3) * scale, (w / 5) * scale, 1],
      position: [(-w / 4) * scale, -h * 1 * scale, 0],
    },
    {
      url: "/uploads/bonaparte_canape-1920x1536.webp",
      scale: [(w / 5) * scale, (w / 5) * scale, 1],
      position: [(w / 4) * scale, -h * 1.2 * scale, 0],
    },
    {
      url: "/uploads/bonaparte_canape-1920x1536.webp",
      scale: [(w / 5) * scale, (w / 5) * scale, 1],
      position: [(w / 10) * scale, -h * 1.75 * scale, 0],
    },
    {
      url: "/uploads/bonaparte_canape-1920x1536.webp",
      scale: [(w / 3) * scale, (w / 3) * scale, 1],
      position: [(-w / 4) * scale, -h * 2 * scale, 0],
    },
    {
      url: "/uploads/bonaparte_canape-1920x1536.webp",
      scale: [(w / 3) * scale, (w / 5) * scale, 1],
      position: [(-w / 4) * scale, -h * 2.6 * scale, 0],
    },
    {
      url: "/uploads/bonaparte_canape-1920x1536.webp",
      scale: [(w / 2) * scale, (w / 2) * scale, 1],
      position: [(w / 4) * scale, -h * 3.1 * scale, 0],
    },
    {
      url: "/uploads/bonaparte_canape-1920x1536.webp",
      scale: [(w / 2.5) * scale, (w / 2) * scale, 1],
      position: [(-w / 6) * scale, -h * 4.1 * scale, 0],
    },
  ];

  return (
    <Scroll>
      {items.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </Scroll>
  );
}

function ResponsiveText() {
  const { width } = useThree((state) => state.viewport);
  const isMobile = width < 3; // Assuming width < 3 is mobile in Three.js units

  const fontSize = isMobile ? "10em" : "25em";
  const rightPosition = isMobile ? "10vw" : "20vw";

  return (
    <Scroll html style={{ width: "100%" }}>
      <h1
        style={{
          position: "absolute",
          top: `100vh`,
          right: rightPosition,
          fontSize: fontSize,
          transform: `translate3d(0,-100%,0)`,
        }}
      >
        all
      </h1>
      <h1 style={{ position: "absolute", top: "180vh", left: "10vw", fontSize: isMobile ? "3em" : "5em" }}>
        hail
      </h1>
      <h1 style={{ position: "absolute", top: "260vh", right: "10vw", fontSize: isMobile ? "3em" : "5em" }}>
        thee,
      </h1>
      <h1 style={{ position: "absolute", top: "350vh", left: "10vw", fontSize: isMobile ? "3em" : "5em" }}>
        thoth
      </h1>
      <h1 style={{ position: "absolute", top: "450vh", right: "10vw", fontSize: isMobile ? "3em" : "5em" }}>
        her
        <br />
        mes.
      </h1>
    </Scroll>
  );
}

export function ParallaxView() {
  const [zoom, setZoom] = useState(80);

  useEffect(() => {
    const handleResize = () => {
      const newZoom = window.innerWidth < 768 ? 40 : 80;
      setZoom(newZoom);
    };

    handleResize(); // Set initial zoom
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-screen">
      <Canvas
        orthographic
        camera={{ zoom: zoom }}
        gl={{ alpha: false, antialias: false, stencil: false, depth: false }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#f0f0f0"]} />
        <ScrollControls damping={6} pages={5}>
          <Items />
          <ResponsiveText />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
