import * as THREE from './three.module.js';
// import { OrbitControls } from './OrbitControls.js';

const elContainer = document.getElementById('control-3d');
const elContainerWidth = elContainer.offsetWidth;
const elContainerHeight = elContainer.offsetHeight;

let isWireframe = false;
let hasAxesHelpers = false;
let usePerspectiveCamera = false;

const scene = new THREE.Scene({ antialias: true });
scene.background = new THREE.Color(0xffffff);

const fov = 75;
const aspect = elContainerWidth / elContainerHeight;
const near = 0.1;
const far = 2000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

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

const geometry = new THREE.Geometry();
geometry.vertices.push(
  // new THREE.Vector3(0, 0, 0),  // 0
  // new THREE.Vector3(-1, 0, 0),  // 1
  // new THREE.Vector3(0, 0, 1),  // 2
  // new THREE.Vector3(0, -1, 0),  // 3
  new THREE.Vector3((8 / 9) ** 0.5, /** */ 0, /** */ -(1 / 3)),  // 0
  new THREE.Vector3(-((2 / 9) ** 0.5), /** */(2 / 3) ** 0.5, /** */ -(1 / 3)),  // 1
  new THREE.Vector3(-((2 / 9) ** 0.5), /** */ -((2 / 3) ** 0.5), /** */ -(1 / 3)),  // 2
  new THREE.Vector3(0, 0, 1),  // 3
);

geometry.faces.push(
  // bottom
  new THREE.Face3(0, 1, 2),
  // front
  new THREE.Face3(0, 3, 2),
  // right
  new THREE.Face3(0, 1, 3),
  // back
  new THREE.Face3(1, 2, 3),
);

geometry.faces[0].color = new THREE.Color('#fff644');
geometry.faces[1].color = new THREE.Color('#9DE03B');
geometry.faces[2].color = new THREE.Color('#20ABFE');
geometry.faces[3].color = new THREE.Color('#D03038');

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

// x = arriba para abajo, y = arriba-izquierda a abajo-derecha, z = rota en sentido antihorario
// mesh.rotation.set(x, y, z);
// mesh.rotation.set(1, 0, 0);
// mesh.rotation.set(0, 1, 0);
// mesh.rotation.set(0, 0, 1);
// mesh.rotation.set(1, 1, 1);
// mesh.rotation.set(-0.43927385314709855, -0.8162790280292672, -1.3) // 100% blue
// mesh.rotation.set(-0.43927385314709855, -0.8162790280292672, -0.02861921459321402) // 100% blue
// mesh.rotation.set(2.685027739156758, -0.8057352837377293, 1.5341909982468425) // 100% green
// mesh.rotation.set(2.5714788463742426, 0.7976984017569686, -3.122006451261966) // 100% red
// mesh.rotation.set(1.0102729943720952, 0.032024282249154275, -0.8180855513429233) // 100% yellow
// mesh.rotation.set(2.5, -0.81, 1.5) // 100% red x2 bassed on green
// mesh.rotation.set(5.5, -0.81, 1.5) // 100% red x2 bassed on green

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

const resize = () => {
  const elContainerUpdated = document.getElementById('control-3d');
  const elContainerWidthUpdated = elContainerUpdated.offsetWidth;
  const elContainerHeightUpdated = elContainerUpdated.offsetHeight;
  renderCamera.aspect = elContainerWidthUpdated / elContainerHeightUpdated;
  renderCamera.updateProjectionMatrix();
  renderer.setSize(elContainerWidthUpdated, elContainerHeightUpdated);
  renderer.render(scene, renderCamera);
}

window.addEventListener('resize', resize);

// #######################
// INTENTO DE ROTACION EN 3D
let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0
};

renderer.domElement.addEventListener('mousedown', e => {
  // if (!isLeftClick(e)) return; // bloquear cualquier botón que no sea el izquierdo
  isDragging = true;
});

renderer.domElement.addEventListener('mousemove', e => {
  const deltaMove = {
    x: e.offsetX - previousMousePosition.x,
    y: e.offsetY - previousMousePosition.y
  };

  // console.log('🎲 deltaMove', deltaMove);

  if (isDragging && isLeftClick(e)) {
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
  // mesh.
});

renderer.domElement.addEventListener('mouseup', e => {
  // if (!isLeftClick(e)) return; // bloquear cualquier botón que no sea el izquierdo
  console.log('🀄 mesh up', mesh);
  // console.log('🧧 renderer', renderer);
  console.log('📹 camera', camera);

  console.log('↗ normal', mesh.geometry.computeFaceNormals());
  // console.log('🈯 camera projectionMatrix', camera.projectionMatrix);
  // console.log('🈯 camera projectionMatrix determinante', camera.projectionMatrix);
  // console.log('🈯 camera projectionMatrix determinante', camera.projectionMatrix.determinant());
  // console.log('🈯 camera projectionMatrix determinante', camera.projectionMatrix.getMaxScaleOnAxis());
  isDragging = false;
});


// #######################
const render = () => {
  // Renderiza en pantalla la escena y la cámara
  renderer.render(scene, renderCamera);
  requestAnimationFrame(render);
}

render();

const toRadians = angle => angle * (Math.PI / 180);
const isLeftClick = e => e.buttons === 1;