import dplots from './dplots.js';
import dstats from './dstats.js';
import './control3d.three.js';
import './control3D.babylon.js';

const main = () => {
  dplots();
  dstats();
  const toogleControl = document.getElementById('toogle-control');
  toogleControl.addEventListener('change', e => {
    console.log('🎊 addEventListener(change)', e.target.value);
    const controlSelected = e.target.value;
    if (controlSelected === 'babylon') {
      document.getElementById('three-control').classList.add('hidden');
      document.getElementById('babylon-control').classList.remove('hidden');
    } else if (controlSelected === 'three') {
      document.getElementById('three-control').classList.remove('hidden');
      document.getElementById('babylon-control').classList.add('hidden');
    }
  });
}

main();