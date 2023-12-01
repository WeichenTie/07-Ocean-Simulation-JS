import {
  AmbientLight,
  Vector3,
  Color,
  PlaneGeometry,
  MeshBasicMaterial,
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Mesh,
  WireframeGeometry,
  LineSegments,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { OceanShaderMaterial } from "./OceanMaterial";

const width = window.innerWidth,
  height = window.innerHeight;

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

const camera = new PerspectiveCamera(70, width / height, 0.01, 3500);
camera.position.set(0, 10, 0);
camera.lookAt(new Vector3(0, 0, 0));
const orbitControls = new OrbitControls(camera, renderer.domElement);

const scene = new Scene();

const oceanGeometry = new PlaneGeometry(30, 30, 100, 100);
const oceanMaterial = OceanShaderMaterial();
const oceanMesh = new Mesh(oceanGeometry, oceanMaterial);

oceanMesh.rotateX(-Math.PI / 2);

const wireframe = new WireframeGeometry(oceanGeometry);
const line = new LineSegments(wireframe);
// oceanMesh.add(line);
// Start Animation
scene.add(oceanMesh);

scene.background = new Color(0x6495ed);
function animation(time: number) {
  oceanMaterial.uniforms.uTime.value = time;
  renderer.render(scene, camera);
  //mesh.translateX(0.05 * Math.sin(0.001 * time));
}
