import utils from './utils.js';

const dstats = async () => {
  const jsonTest = await utils.jsonRequest('https://jsonplaceholder.typicode.com/todos');

  console.log('📋 jsonTest', jsonTest);
  
  const usersListplay = {};

  for (const user of jsonTest) {
    if (!usersListplay[user.userId]) {
      usersListplay[user.userId] = [];
    }
    usersListplay[user.userId].push(user.title);
  }

  console.log('🎵 user music list', usersListplay);


  const trace = {
    x: Object.keys(usersListplay),
    y: usersListplay,
    type: 'bar',
  };

  const data = [trace];

  const layout = {
    paper_bgcolor: 'white',
    title: 'Quality curve',
    font: { color: 'black' },
    margin: {
      l: 10,
      r: 10,
      b: 100,
      t: 100,
      // pad: 4
    },
  };

  const config = { showLink: false, responsive: true }

  Plotly.newPlot("plot-stats", data, layout, config);
}

export default dstats;