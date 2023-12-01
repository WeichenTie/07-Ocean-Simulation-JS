import { GLSL3, ShaderMaterial } from "three";

export function OceanShaderMaterial() {
  const shader = new ShaderMaterial({
    glslVersion: GLSL3,
    uniforms: {
      uTime: { value: 0.0 },
    },
    vertexShader: `
    #pragma glslify: fft = require(glsl-fft)
    float rand(float n){return fract(sin(n) * 43758.5453123);}
    float rand(vec2 n) { 
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }
    float noise(float p) {
        float fl = floor(p);
    float fc = fract(p);
        return mix(rand(fl), rand(fl + 1.0), fc);
    }
        
    float noise(vec2 n) {
        const vec2 d = vec2(0.0, 1.0);
        vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
        return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
    }
    #define PI 3.14159265354

    uniform float uTime;
    out vec4 color;
    void main() {

        vec3 finalPosition = vec3(position);
        float height = exp(-(0.191));
        finalPosition.z = noise(position.xy + vec2(uTime, uTime) * 0.0025);

        color = vec4(uv,0.0,1.0);
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(finalPosition, 1.0);
    }
    `,
    fragmentShader: `
    in vec4 color;
    out vec4 FragColor;
    void main() {
        FragColor = vec4(color);
    }
    `,
  });
  return shader;
}
