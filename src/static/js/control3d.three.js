// ARCHIVO QUE CONTIENE UN TETRAHEDRON CON THREE.JS
import * as THREE from './three.module.js';
// import { OrbitControls } from './OrbitControls.js';

const nameContainer = 'three-control';
const elContainer = document.getElementById(nameContainer);
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
  700
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
  // bottom - yellow
  new THREE.Face3(2, 1, 0),
  // front - green
  new THREE.Face3(0, 3, 2),
  // right - blue
  new THREE.Face3(0, 1, 3),
  // back - red
  new THREE.Face3(1, 2, 3),
);

geometry.faces[0].color = new THREE.Color('#fff644');
geometry.faces[1].color = new THREE.Color('#9DE03B');
geometry.faces[2].color = new THREE.Color('#20ABFE');
geometry.faces[3].color = new THREE.Color('#D03038');

// Material básico de un solo color, sin reflejos, ni sombras.
const material = new THREE.MeshBasicMaterial({
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
newCamera.position.z = 10;

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
  const elContainerUpdated = document.getElementById(nameContainer);
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
    // const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
    //   new THREE.Euler(
    //     toRadians(deltaMove.y * 1),
    //     toRadians(deltaMove.x * 1),
    //     0,
    //     'XYZ'
    //   )
    // );
    // console.log(deltaRotationQuaternion);
    //mesh.quaternion.multiplyQuaternions(deltaRotationQuaternion, mesh.quaternion);
    mesh.geometry.rotateY(toRadians(deltaMove.x * 1));
    mesh.geometry.rotateX(toRadians(deltaMove.y * 1));


    // console.log('🔄 quaternion', mesh.quaternion);
	//console.log('🔄 rotating', 'rotating');
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
  //console.log('📹 camera', camera);
  
  console.log('↗ normal', mesh.geometry.computeFaceNormals());

  //////////////////////////////////--begin--////////////////////////////////////////////



  /* camera position and normal vector of each face    */
  //mesh.geometry.computeFaceNormals()
  console.log('↗ hola', 'hola');
  console.log('↗ faces', mesh.geometry.faces);
  // direction to the camera,  dir = cameraPosition - Position of the figure
  const dirToCamera = newCamera.position.clone().sub(mesh.position);
  dirToCamera.normalize();

  console.log('↗ dirToCamera', dirToCamera);
  console.log('↗ newCamera.position', newCamera.position);
  console.log('↗ camera.position', camera.position);
  console.log('↗ mesh.position', mesh.position);


  // dot product of the to vectors
  const angleValueFaceYellow = mesh.geometry.faces[0].normal.dot(dirToCamera);
  const angleValueFaceGreen = mesh.geometry.faces[1].normal.dot(dirToCamera);
  const angleValueFaceBlue = mesh.geometry.faces[2].normal.dot(dirToCamera);
  const angleValueFaceRed = mesh.geometry.faces[3].normal.dot(dirToCamera);
  // angleValue will be 1 when facing the camera,
  // 0 when 90degree, and -1 when face the opposite direction.
  // If you need degrees instead, do this:

  const angleYellow = Math.acos(angleValueFaceYellow) * 180 / Math.PI;
  const angleGreen = Math.acos(angleValueFaceGreen) * 180 / Math.PI;
  const angleBlue = Math.acos(angleValueFaceBlue) * 180 / Math.PI;
  const angleRed = Math.acos(angleValueFaceRed) * 180 / Math.PI;



  console.log('↗ angleValueFaceYellow', angleValueFaceYellow);
  console.log('↗ angleValueFaceGreen', angleValueFaceGreen);
  console.log('↗ angleValueFaceBlue', angleValueFaceBlue);
  console.log('↗ angleValueFaceRed', angleValueFaceRed);

  console.log('↗ angleYellow', angleYellow);
  console.log('↗ angleGreen', angleGreen);
  console.log('↗ angleBlue', angleBlue);
  console.log('↗ angleRed', angleRed);
  console.log('↗ mesh.quaternion', mesh.quaternion);
  console.log('↗ mesh', mesh);
  ///////////////////////////////--end--/////////////////////////////////////////////////////
  let facesPercentage = calcIndex(angleValueFaceYellow, angleValueFaceGreen, angleValueFaceBlue, angleValueFaceRed);

  console.log('↗ Percentage Yellow', facesPercentage.yellow);
  console.log('↗ Percentage Green', facesPercentage.green);
  console.log('↗ Percentage Blue', facesPercentage.blue);
  console.log('↗ Percentage Red', facesPercentage.red);

  document.getElementById('index-red').innerText = `${+facesPercentage.red.toFixed(2)}%`;
  document.getElementById('index-yellow').innerText = `${+facesPercentage.yellow.toFixed(2)}%`;
  document.getElementById('index-green').innerText = `${+facesPercentage.green.toFixed(2)}%`;
  document.getElementById('index-blue').innerText = `${+facesPercentage.blue.toFixed(2)}%`;


  // console.log('🈯 camera projectionMatrix', camera.projectionMatrix);
  // console.log('🈯 camera projectionMatrix determinante', camera.projectionMatrix);
  // console.log('🈯 camera projectionMatrix determinante', camera.projectionMatrix.determinant());
  // console.log('🈯 camera projectionMatrix determinante', camera.projectionMatrix.getMaxScaleOnAxis());
  isDragging = false;
});

// Calculor de indices de faces RD
function calcIndex(angleValueFaceYellow, angleValueFaceGreen, angleValueFaceBlue, angleValueFaceRed) {
  let angleValueTotal = 0;
  let faceYellow = false;
  let faceGreen = false;
  let faceBlue = false;
  let faceRed = false;
  let contFaces = 0;
  let facePercentageYellow = 0.0;
  let facePercentageGreen = 0.0;
  let facePercentageBlue = 0.0;
  let facePercentageRed = 0.0;

  if (angleValueFaceYellow >= 0) {
    angleValueTotal += angleValueFaceYellow;
    faceYellow = true;
    contFaces++;
  }
  if (angleValueFaceGreen >= 0) {
    angleValueTotal += angleValueFaceGreen;
    faceGreen = true;
    contFaces++;
  }
  if (angleValueFaceBlue >= 0) {
    angleValueTotal += angleValueFaceBlue;
    faceBlue = true;
    contFaces++;
  }
  if (angleValueFaceRed >= 0) {
    angleValueTotal += angleValueFaceRed;
    faceRed = true;
    contFaces++;
  }

  if (faceYellow) facePercentageYellow = angleValueFaceYellow / angleValueTotal * 100;
  if (faceGreen) facePercentageGreen = angleValueFaceGreen / angleValueTotal * 100;
  if (faceBlue) facePercentageBlue = angleValueFaceBlue / angleValueTotal * 100;
  if (faceRed) facePercentageRed = angleValueFaceRed / angleValueTotal * 100;

  return {
    yellow: facePercentageYellow,
    green: facePercentageGreen,
    blue: facePercentageBlue,
    red: facePercentageRed
  }
}


// #######################
const render = () => {
  // Renderiza en pantalla la escena y la cámara
  renderer.render(scene, renderCamera);
  requestAnimationFrame(render);
}

render();

const toRadians = angle => angle * (Math.PI / 180);
const isLeftClick = e => e.buttons === 1;