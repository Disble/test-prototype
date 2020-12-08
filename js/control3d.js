import * as THREE from './three.module.js';
// import { OrbitControls } from './OrbitControls.js';

const elContainer = document.getElementById('control-3d');
const elContainerWidth = elContainer.offsetWidth;
const elContainerHeight = elContainer.offsetHeight;

let isWireframe = false;
let hasAxesHelpers = false;
// let enableAllControls = false;
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

const geometry = new THREE.TetrahedronBufferGeometry();
console.log(geometry);

// Crea grupos de vertices a los que se asigna un material de una array.
geometry.clearGroups(); // just in case
geometry.addGroup(0, 3, 0); // first 3 vertices use material 0
geometry.addGroup(3, 3, 1); // next 3 vertices use material 1
geometry.addGroup(6, 9, 2); // remaining vertices use material 2
geometry.addGroup(9, Infinity, 3); // remaining vertices use material 3

// Pinta cada cara
const material = [
  // Material básico que no le afecta la luz, sin reflejos, ni sombras.
  new THREE.MeshBasicMaterial({ color: 0Xfff644 }),
  new THREE.MeshBasicMaterial({ color: 0x9DE03B }),
  new THREE.MeshBasicMaterial({ color: 0x20ABFE }),
  new THREE.MeshBasicMaterial({ color: 0xD03038 }),
];

// geometry.boundingSphere.center.x = 3;

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
// const controls = new OrbitControls(renderCamera, renderer.domElement);
// if (!enableAllControls) {
//   // Desactiva las teclas
//   controls.enableKeys = false;
//   // Desactiva que se pueda mover la cámara con el mouse o teclado
//   controls.screenSpacePanning = false;
//   // Deshabilita la posiblidad de hacer zoom
//   controls.enableZoom = false;
// }

window.addEventListener('resize', resize);

function resize() {
  renderCamera.aspect = elContainerWidth / elContainerHeight;
  renderCamera.updateProjectionMatrix();
  renderer.setSize(elContainerWidth, elContainerHeight);
  renderer.render(scene, renderCamera);
}


// #######################
// INTENTO DE ROTACION EN 3D
let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0
};

renderer.domElement.addEventListener('mousedown', e => {
  if (!isLeftClick(e)) return; // bloquear cualquier botón que no sea el izquierdo
  isDragging = true;
});

renderer.domElement.addEventListener('mousemove', e => {
  if (!isLeftClick(e)) return; // bloquear cualquier botón que no sea el izquierdo
  const deltaMove = {
    x: e.offsetX - previousMousePosition.x,
    y: e.offsetY - previousMousePosition.y
  };

  // console.log('🎲 deltaMove', deltaMove);

  if (isDragging) {
    const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        toRadians(deltaMove.y * 1),
        toRadians(deltaMove.x * 1),
        0,
        'XYZ'
      )
    );
    // console.log(deltaRotationQuaternion);
    mesh.quaternion.multiplyQuaternions(deltaRotationQuaternion, mesh.quaternion);
    // console.log('🔄 quaternion', mesh.quaternion);
  }

  previousMousePosition = {
    x: e.offsetX,
    y: e.offsetY
  };
});

renderer.domElement.addEventListener('mouseup', e => {
  // if (!isLeftClick(e)) return; // bloquear cualquier botón que no sea el izquierdo
  console.log('🀄 mesh up', mesh);
  isDragging = false;
});




// #######################

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

const toRadians = angle => angle * (Math.PI / 180);
const isLeftClick = e => e.buttons === 1;