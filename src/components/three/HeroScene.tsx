import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Aurora() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
    uniforms.uMouse.value.set(
      uniforms.uMouse.value.x + (mouse.current.x - uniforms.uMouse.value.x) * 0.03,
      uniforms.uMouse.value.y + (mouse.current.y - uniforms.uMouse.value.y) * 0.03
    );
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec2 uMouse;
          varying vec2 vUv;

          // Simplex-like noise
          vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
          vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
          vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

          float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405, 0.366025403784, -0.577350269189, 0.024390243902);
            vec2 i = floor(v + dot(v, C.yy));
            vec2 x0 = v - i + dot(i, C.xx);
            vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
            vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
            m = m * m;
            m = m * m;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 a0 = x - floor(x + 0.5);
            m *= 1.792843 - 0.853735 * (a0*a0 + h*h);
            vec3 g;
            g.x = a0.x * x0.x + h.x * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
          }

          void main() {
            vec2 uv = vUv;
            float t = uTime * 0.15;

            // Distort UV with mouse
            uv.x += (uMouse.x - 0.5) * 0.05;
            uv.y += (uMouse.y - 0.5) * 0.05;

            // Multiple noise layers
            float n1 = snoise(uv * 1.5 + vec2(t, t * 0.5)) * 0.5 + 0.5;
            float n2 = snoise(uv * 2.5 + vec2(-t * 0.7, t * 0.3)) * 0.5 + 0.5;
            float n3 = snoise(uv * 4.0 + vec2(t * 0.3, -t * 0.6)) * 0.5 + 0.5;

            // Color channels
            vec3 c1 = vec3(0.38, 0.23, 0.92);  // indigo
            vec3 c2 = vec3(0.13, 0.71, 0.83);  // cyan
            vec3 c3 = vec3(0.65, 0.35, 0.96);  // purple

            vec3 color = c1 * n1 + c2 * n2 * 0.5 + c3 * n3 * 0.3;

            // Flowing band shape - concentrated in upper right
            float band = smoothstep(0.2, 0.6, uv.x + uv.y * 0.3 + n1 * 0.3);
            float fade = smoothstep(1.2, 0.5, uv.x + uv.y * 0.5);
            float shape = band * fade;

            // Bottom fade to protect text area
            shape *= smoothstep(0.0, 0.4, uv.y);

            float alpha = shape * 0.35;
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <Aurora />
      </Canvas>
    </div>
  );
}
