const canvas = document.getElementById("babylon-control");
/* all our JavaScript code goes here */
const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
// Scene
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(1, 1, 1);
scene.ambientColor = new BABYLON.Color3(1, 1, 1);
// Camera
const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), scene);

const faceColors = new Array(4);
faceColors[0] = new BABYLON.Color4(1, 0.96, 0.27, 1);
faceColors[1] = new BABYLON.Color4(0.62, 0.88, 0.23, 1);
faceColors[2] = new BABYLON.Color4(0.13, 0.67, 0.99, 1);
faceColors[3] = new BABYLON.Color4(0.82, 0.19, 0.22, 1);
// Prism
const tetrahedronPrism = {
  name: "Tetrahedron",
  category: ["Tetrahedron"],
  vertex: [
    [(8 / 9) ** 0.5, /** */ 0, /** */ -(1 / 3)],
    [-((2 / 9) ** 0.5), /** */(2 / 3) ** 0.5, /** */ -(1 / 3)],
    [-((2 / 9) ** 0.5), /** */ -((2 / 3) ** 0.5), /** */ -(1 / 3)],
    [0, 0, 1]
  ],
  face: [
    [2, 1, 0],
    [0, 3, 2],
    [0, 1, 3],
    [1, 2, 3]
  ],
  faceColors: faceColors
};
// Box
// const box = BABYLON.Mesh.Tetrahedron('box', 2, scene);
const tetrahedron = BABYLON.MeshBuilder.CreatePolyhedron("t", tetrahedronPrism, scene);
tetrahedron.updateFacetData();
// Material
const tetrahedronMaterial = new BABYLON.StandardMaterial('material', scene);
// tetrahedronMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
tetrahedronMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
tetrahedron.material = tetrahedronMaterial;

// INTENTO DE ROTACION EN 3D x2
let isDragging = false;
let currentPosition = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };
//variables to set last angle and curr angle in each frame
//so we can calculate angleDiff and use it for inertia
let lastAngleDiff = { x: 0, y: 0 };
let oldAngle = { x: 0, y: 0 };
let newAngle = { x: 0, y: 0 };

canvas.addEventListener('pointerdown', evt => {
  console.log('addEventListener(mousedown');
  currentPosition.x = evt.clientX;
  currentPosition.y = evt.clientY;
  currentRotation.x = tetrahedron.rotation.x;
  currentRotation.y = tetrahedron.rotation.y;
  isDragging = true;
});

canvas.addEventListener('pointermove', evt => {
  if (isDragging) {
    //set last angle before changing the rotation
    oldAngle.x = tetrahedron.rotation.x;
    oldAngle.y = tetrahedron.rotation.y;
    //rotate the mesh
    tetrahedron.rotation.y -= (evt.clientX - currentPosition.x) / 80.0;
    tetrahedron.rotation.x -= (evt.clientY - currentPosition.y) / 80.0;
    //set the current angle after the rotation
    newAngle.x = tetrahedron.rotation.x;
    newAngle.y = tetrahedron.rotation.y;
    //calculate the anglediff
    lastAngleDiff.x = newAngle.x - oldAngle.x;
    lastAngleDiff.y = newAngle.y - oldAngle.y;
    currentPosition.x = evt.clientX;
    currentPosition.y = evt.clientY;
  }
});

canvas.addEventListener('pointerup', e => {
  console.log('addEventListener(mouseup');
  isDragging = false;
  console.log('🔺 tetrahedron', tetrahedron);
  console.log('📹 camera', camera);
  // console.log('📹 camera', tetrahedron.position);
  const dirToCamera = camera.position.clone().subtract(tetrahedron.position);
  dirToCamera.normalize();
  console.log('📹↗ dirToCamera', dirToCamera);

  const angleValueFaceYellow = BABYLON.Vector3.Dot(tetrahedron.getFacetNormal(0), dirToCamera);
  const angleValueFaceGreen = BABYLON.Vector3.Dot(tetrahedron.getFacetNormal(1), dirToCamera);
  const angleValueFaceBlue = BABYLON.Vector3.Dot(tetrahedron.getFacetNormal(2), dirToCamera);
  const angleValueFaceRed = BABYLON.Vector3.Dot(tetrahedron.getFacetNormal(3), dirToCamera);

  console.log('↗ angleValueFaceYellow', angleValueFaceYellow);
  console.log('↗ angleValueFaceGreen', angleValueFaceGreen);
  console.log('↗ angleValueFaceBlue', angleValueFaceBlue);
  console.log('↗ angleValueFaceRed', angleValueFaceRed);

  let facesPercentage = calcIndex(angleValueFaceYellow, angleValueFaceGreen, angleValueFaceBlue, angleValueFaceRed);

  console.log('↗ Percentage Yellow', facesPercentage.yellow);
  console.log('↗ Percentage Green', facesPercentage.green);
  console.log('↗ Percentage Blue', facesPercentage.blue);
  console.log('↗ Percentage Red', facesPercentage.red);

  document.getElementById('index-red').innerText = `${+facesPercentage.red.toFixed(2)}%`;
  document.getElementById('index-yellow').innerText = `${+facesPercentage.yellow.toFixed(2)}%`;
  document.getElementById('index-green').innerText = `${+facesPercentage.green.toFixed(2)}%`;
  document.getElementById('index-blue').innerText = `${+facesPercentage.blue.toFixed(2)}%`;
});

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

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
// Rendering loop
const renderLoop = function () {
  scene.render();
};
engine.runRenderLoop(renderLoop);
const toRadians = angle => angle * (Math.PI / 180);
const isLeftClick = e => e.buttons === 1;
export default engine;