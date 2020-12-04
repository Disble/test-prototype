import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

const elContainer = document.getElementById('control-3d');
const elContainerWidth = elContainer.offsetWidth;
const elContainerHeight = elContainer.offsetHeight;

let isWireframe = false;
let hasAxesHelpers = false;
let enableAllControls = false;
let usePerspectiveCamera = false;

const scene = new THREE.Scene({ antialias: true });
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  75,
  elContainerWidth / elContainerHeight,
  0.1,
  2000
);

// Cámara con las guías
const newCamera = new THREE.PerspectiveCamera(
  45,
  elContainerWidth / elContainerHeight,
  3,
  7
);
const helper = new THREE.CameraHelper(newCamera);
scene.add(newCamera);
scene.add(helper);

const geometry = new THREE.TetrahedronGeometry();
// Pinta cada cara
geometry.faces[0].color.setHex(0Xfff644);
geometry.faces[1].color.setHex(0x9DE03B);
geometry.faces[2].color.setHex(0x20ABFE);
geometry.faces[3].color.setHex(0xD03038);

// Material básico de un solo color, sin reflejos, ni sombras.
const material = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  flatShading: true,
  vertexColors: THREE.VertexColors,
  wireframe: isWireframe
});

const mesh = new THREE.Mesh(
  geometry,
  material
);
scene.add(mesh);


camera.position.set(-10, 10, 10);
newCamera.position.z = 5;

// Muestra el eje de coordenadas
if (hasAxesHelpers) {
  scene.add(new THREE.AxesHelper(500));
}

// Selecciona entre la camara principal (frente objeto) o la de perpectiva (lejos).
const renderCamera = usePerspectiveCamera ? camera : newCamera;

// Seleccionamos el método de renderizado
const renderer = new THREE.WebGLRenderer();
renderer.setSize(elContainerWidth, elContainerHeight);
// Agregamos el renderizado al DOM, aún no muestra.
elContainer.appendChild(renderer.domElement);

// Solo con el new ya se crea y activa los controls
const controls = new OrbitControls(renderCamera, renderer.domElement);
if (!enableAllControls) {
  // Desactiva las teclas
  controls.enableKeys = false;
  // Desactiva que se pueda mover la cámara con el mouse o teclado
  controls.screenSpacePanning = false;
  // Deshabilita la posiblidad de hacer zoom
  controls.enableZoom = false;
}

window.addEventListener('resize', resize);

function resize() {
  renderCamera.aspect = elContainerWidth / elContainerHeight;
  renderCamera.updateProjectionMatrix();
  renderer.setSize(elContainerWidth, elContainerHeight);
  renderer.render(scene, renderCamera);
}

const animate = () => {
  requestAnimationFrame(animate);

  // Recorre todos los objetos de la escena.
  // La cámara cuenta como un objeto.
  scene.traverse((object) => {
    // Comprueba que el objeto es una forma
    if (object.isMesh === true) {
      // Rota el objeto en pantalla.
      // object.rotation.x += 0.01;
      // object.rotation.y += 0.01;
      // Esto no se que hace
      if (object.material.map) {
        object.material.map.anisotropy = 16;
      }
    }
  });

  // FINAL
  // Renderiza en pantalla la escena y la cámara
  renderer.render(scene, renderCamera);
}

animate();