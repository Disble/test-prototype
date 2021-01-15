import utils from './utils.js';

const dstats = async () => {
  // const jsonTest = await utils.jsonRequest('https://jsonplaceholder.typicode.com/todos');

  // console.log('📋 jsonTest', jsonTest);
  
  // const usersListplay = {};

  // for (const user of jsonTest) {
  //   if (!usersListplay[user.userId]) {
  //     usersListplay[user.userId] = [];
  //   }
  //   usersListplay[user.userId].push(user.title);
  // }

  // console.log('🎵 user music list', usersListplay);


  const trace = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    y: [10, 8, 6, 5.5, 5, 4.5, 4.4, 4.3, 4.2, 4.1, 4, 3.95, 3.9, 3.85, 3.8],
    type: 'line',
  };

  const data = [trace];

  const layout = {
    paper_bgcolor: 'white',
    title: 'Quality curve',
    font: { color: '#2a3b47', family: 'Open Sans' },
    margin: {
      l: 10,
      r: 10,
      b: 50,
      t: 100,
      // pad: 4
    },
  };

  const config = { responsive: true }

  Plotly.newPlot("plot-stats", data, layout, config);
}

export default dstats;