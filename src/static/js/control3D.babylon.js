const canvas = document.getElementById("babylon-control");
/* all our JavaScript code goes here */
const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
// Scene
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(1, 1, 1);
scene.ambientColor = new BABYLON.Color3(1, 1, 1);
// Camera
const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), scene);
// const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero());
// camera.attachControl(canvas, true);

// Light
// const light = new BABYLON.PointLight('light', new BABYLON.Vector3(10, 10, 10), scene);
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
// const tetrahedron = BABYLON.MeshBuilder.CreatePolyhedron("h", { type: 0, size: 1, faceColors }, scene);
tetrahedron.rotation.x = -0.2;
tetrahedron.rotation.y = -0.4;
// Material
const tetrahedronMaterial = new BABYLON.StandardMaterial('material', scene);
// tetrahedronMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
tetrahedronMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
tetrahedron.material = tetrahedronMaterial;

// INTENTO DE ROTACION EN 3D x2
let isDragging = false;
let currentPosition = { x: 0, y: 0 };

canvas.addEventListener('pointerdown', e => {
  console.log('addEventListener(mousedown');
  // if (!isLeftClick(e)) return; // bloquear cualquier botón que no sea el izquierdo
  currentPosition.x = e.clientX;
  currentPosition.y = e.clientY;
  isDragging = true;
});

canvas.addEventListener('pointermove', e => {
  if (isDragging && isLeftClick(e)) {
    tetrahedron.rotation.y = (e.clientX - currentPosition.x) / 80.0;
    tetrahedron.rotation.x = (e.clientY - currentPosition.y) / 80.0;
  }
});

canvas.addEventListener('pointerup', e => {
  console.log('addEventListener(mouseup');
  isDragging = false;
  console.log('🔺 tetrahedron', tetrahedron);
});

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