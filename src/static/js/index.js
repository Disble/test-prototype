import dplots from './dplots.js';
import dstats from './dstats.js';
import control3dThree from './control3d.three.js';
import engine from './control3D.babylon.js';
import frontEndController from './frontend.controller.js';

const main = () => {
  dplots();
  dstats();
  control3dThree({ updateStats: frontEndController.updateStats, generateStats: dplots });
  const toogleControl = document.getElementById('toogle-control');
  toogleControl.addEventListener('change', e => {
    console.log('🎊 addEventListener(change)', e.target.value);
    const controlSelected = e.target.value;
    frontEndController.updateStats({ engine: controlSelected, isOnChange: true, callback: () => engine.resize() });
  });
}

main();