const setStats = ({ red = 33, yellow = 0, green = 33, blue = 33 }) => {
  document.getElementById('index-red').innerText = `${red}%`;
  document.getElementById('index-yellow').innerText = `${yellow}%`;
  document.getElementById('index-green').innerText = `${green}%`;
  document.getElementById('index-blue').innerText = `${blue}%`;
}

const frontEndController = {
  updateStats: ({ engine = 'three', red, yellow, green, blue, isOnChange = true, callback }) => {
    console.log('updateStats', red, yellow, green, blue);
    if (engine === 'three') {
      document.getElementById('three-control').classList.remove('hidden');
      document.getElementById('babylon-control').classList.add('hidden');
      if (callback) callback();
      // revisad esto
      // if (!red || !yellow || !green || !blue) {
      //   setStats({ red: 33, yellow: 0, green: 33, blue: 33 })
      // }
    } else if (engine === 'babylon') {
      document.getElementById('three-control').classList.add('hidden');
      document.getElementById('babylon-control').classList.remove('hidden');
      if (callback) callback();
      // revisad esto
      // if (!red || !yellow || !green || !blue) {
      //   setStats({ red: 100, yellow: 0, green: 0, blue: 0 });
      // }
    }
    // if (red && yellow && green && blue) {
    setStats({ red, yellow, green, blue });
    // }
  }
}

export default frontEndController;