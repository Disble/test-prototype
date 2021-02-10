// ARCHIVO QUE CONTIENE UN TETRAHEDRON CON THREE.JS
import * as THREE from './three.module.js';

const control3dThree = ({ updateStats, generateStats }) => {
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
  // 🐟
  renderer.domElement.addEventListener('mousedown', e => {
    isDragging = true;
  });
  // 🐠
  renderer.domElement.addEventListener('mousemove', e => {
    const deltaMove = {
      x: e.offsetX - previousMousePosition.x,
      y: e.offsetY - previousMousePosition.y
    };
  
    if (isDragging && isLeftClick(e)) {
      if (e.ctrlKey === true) {
        mesh.geometry.rotateZ(toRadians(-deltaMove.x * 1));
        mesh.geometry.rotateZ(toRadians(-deltaMove.y * 1));
      } else {
        mesh.geometry.rotateY(toRadians(deltaMove.x * 1));
        mesh.geometry.rotateX(toRadians(deltaMove.y * 1));
      }
    }
  
    previousMousePosition = {
      x: e.offsetX,
      y: e.offsetY
    };
  });
  // 🐡
  const handleCalc = e => {
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
  
    ///////////////////////////////--end--/////////////////////////////////////////////////////
    let facesPercentage = calcIndex(angleValueFaceYellow, angleValueFaceGreen, angleValueFaceBlue, angleValueFaceRed);
  
    console.log('↗ Percentage Yellow', facesPercentage.yellow);
    console.log('↗ Percentage Green', facesPercentage.green);
    console.log('↗ Percentage Blue', facesPercentage.blue);
    console.log('↗ Percentage Red', facesPercentage.red);

    updateStats({
      engine: 'three',
      red: (+(facesPercentage.red * 100)).toFixed(2),
      yellow: (+(facesPercentage.yellow * 100)).toFixed(2),
      green: (+(facesPercentage.green * 100)).toFixed(2),
      blue: (+(facesPercentage.blue * 100)).toFixed(2)
    });

    generateStats({ kernel: facesPercentage })

    // document.getElementById('index-red').innerText = `${+facesPercentage.red.toFixed(2)}%`;
    // document.getElementById('index-yellow').innerText = `${+facesPercentage.yellow.toFixed(2)}%`;
    // document.getElementById('index-green').innerText = `${+facesPercentage.green.toFixed(2)}%`;
    // document.getElementById('index-blue').innerText = `${+facesPercentage.blue.toFixed(2)}%`;

    isDragging = false;
  }
  
  const rotateWithArrows = e => {
    const arrowKeys = {
      ArrowUp: () => mesh.geometry.rotateX(-0.01),
      ArrowLeft: () => mesh.geometry.rotateY(-0.01),
      ArrowDown: () => mesh.geometry.rotateX(0.01),
      ArrowRight: () => mesh.geometry.rotateY(0.01)
    };
    const handleArrow = arrowKeys[e.key];
    if (handleArrow) return handleArrow();
  }
  
  const rotateWithArrowsCtrl = e => {
    const arrowKeys = {
      ArrowUp: () => mesh.geometry.rotateZ(-0.01),
      ArrowLeft: () => mesh.geometry.rotateZ(0.01),
      ArrowDown: () => mesh.geometry.rotateZ(0.01),
      ArrowRight: () => mesh.geometry.rotateZ(-0.01)
    };
    const handleArrow = arrowKeys[e.key];
    if (handleArrow) return handleArrow();
  }
  
  
  document.addEventListener('keyup', e => {
    let isExec = false;
    if (e.ctrlKey === true) {
      isExec = rotateWithArrowsCtrl(e);
    } else {
      isExec = rotateWithArrows(e);
    }
    if (isExec) handleCalc(e);
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.repeat) {
      if (e.ctrlKey === true) {
        rotateWithArrowsCtrl(e);
      } else {
        rotateWithArrows(e);
      }
    }
  });
  
  renderer.domElement.addEventListener('mouseup', handleCalc);
  
  // Calculor de indices de faces RD
  function calcIndex(angleValueFaceYellow, angleValueFaceGreen, angleValueFaceBlue, angleValueFaceRed) {
    // De momento 6.71% de error
    // R: 93.29% B: 6.71% G: 0% Y: 0%
    // Cuando se ve un 100% de cara Roja
    // R: 6.82% B: 45.05% G: 48.13% Y: 0%
    // Solo se ve azul y verde
    let angleValueTotal = 0;
    let faceYellow = false;
    let faceGreen = false;
    let faceBlue = false;
    let faceRed = false;
    let facePercentageYellow = 0.0;
    let facePercentageGreen = 0.0;
    let facePercentageBlue = 0.0;
    let facePercentageRed = 0.0;
  
    if (angleValueFaceYellow >= 0) {
      angleValueTotal += angleValueFaceYellow;
      faceYellow = true;
    }
    if (angleValueFaceGreen >= 0) {
      angleValueTotal += angleValueFaceGreen;
      faceGreen = true;
    }
    if (angleValueFaceBlue >= 0) {
      angleValueTotal += angleValueFaceBlue;
      faceBlue = true;
    }
    if (angleValueFaceRed >= 0) {
      angleValueTotal += angleValueFaceRed;
      faceRed = true;
    }
  
    if (faceYellow) facePercentageYellow = angleValueFaceYellow / angleValueTotal;
    if (faceGreen) facePercentageGreen = angleValueFaceGreen / angleValueTotal;
    if (faceBlue) facePercentageBlue = angleValueFaceBlue / angleValueTotal;
    if (faceRed) facePercentageRed = angleValueFaceRed / angleValueTotal;
  
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
}

export default control3dThree;