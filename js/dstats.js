import DotCSV from './dotcsv.js';
import utils from './utils.js';

const dstats = async () => {
  const jsonTest = await utils.jsonRequest('https://jsonplaceholder.typicode.com/todos/1');

  console.log('📋 jsonTest', jsonTest);

  // const sphere2D = new DotCSV(sphere2DCSV, ['X', 'Y']);

  // const trace1 = {
  //   x: sphere3D.x,
  //   y: sphere3D.y,
  //   z: sphere3D.z,
  //   marker: {
  //     size: 2,
  //     color: sphere3D.getColors('petal width'),
  //     colorscale: 'Reds',
  //     line: { color: 'transparent' }
  //   },
  //   mode: 'markers',
  //   type: 'scatter3d',
  //   text: sphere3D.getColumn('iris'),
  //   hoverinfo: 'x+y+z+text',
  //   showlegend: false,
  // };

  // const data = [trace1];

  // const layout = {
  //   paper_bgcolor: 'white',
  //   title: 'Sphere reduction',
  //   font: { color: 'black' },
  //   margin: {
  //     l: 5,
  //     r: 5,
  //     b: 100,
  //     t: 100,
  //     // pad: 4
  //   },
  // };

  // const config = {showLink: false, responsive: true}

  // Plotly.newPlot("plot-stats", data, layout, config);
}

export default dstats;