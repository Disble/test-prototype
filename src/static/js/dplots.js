import DotCSV from './dotcsv.js';
import utils from './utils.js';

const dplots = async ({ kernel } = {}) => {
  console.log("✨ kernel", kernel);
  if (kernel === undefined) return;
  const jsonTest = await utils.jsonRequest(`http://186.71.197.203:8000/api/kcmds?k1=${kernel.yellow}&k2=${kernel.green}&k3=${kernel.blue}&k4=${kernel.red}`);

  console.log('📋 jsonTest', jsonTest);

  const sphere2DCSV = await utils.csvRequest('../csv/MDSRDLabeled.csv');
  const sphere3DCSV = await utils.csvRequest('../csv/sphereLabel.csv');

  const sphere2D = new DotCSV(sphere2DCSV, ['X', 'Y']);
  const sphere3D = new DotCSV(sphere3DCSV, [jsonTest.x, jsonTest.y, jsonTest.z]);

  console.log(Math.min(...jsonTest.labels));
  console.log(Math.max(...jsonTest.labels));

  // const colors = ['red', 'blue', 'green', 'yellow', 'brown', 'pink', 'orchid',
  //   'mediumslateblue', 'orangered', 'darkgreen', 'steelblue', 'sandybrown',
  //   'maroon', 'slategrey', 'teal'];

  const colors = {
    4: 'red',
    5: 'blue',
    6: 'green',
    7: 'yellow',
    8: 'pink'
  }

  const labelsColors = jsonTest.labels.map(label => colors[label]);
  console.log(labelsColors);

  const trace1 = {
    x: jsonTest.x,
    y: jsonTest.y,
    z: jsonTest.z,
    marker: {
      size: 2,
      color: labelsColors,
      colorscale: 'Reds',
      line: { color: 'transparent' }
    },
    mode: 'markers',
    type: 'scatter3d',
    // text: sphere3D.getColumn('iris'),
    hoverinfo: 'x+y+z+text',
    showlegend: false,
  };

  const trace2 = {
    x: sphere2D.x,
    y: sphere2D.y,
    xaxis: 'x2',
    yaxis: 'y2',
    mode: 'markers',
    marker: {
      size: 5,
      line: {
        color: 'rgba(217, 217, 217, 0.14)',
        width: 0.5
      },
      opacity: 0.8,
      color: sphere2D.getColors('Label'),
    },
    hovertext: sphere2D.getColors('Label'),
    showlegend: false,
    type: 'scatter',
  };

  const data = [trace1, trace2];

  const layout = {
    paper_bgcolor: 'white',
    title: 'Sphere reduction',
    font: { color: 'rgb(42 59 71)', family: 'Open Sans' },
    grid: {
      rows: 1,
      columns: 2,
      pattern: 'independent',
    },
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 100,
      // pad: 4
    },
    xaxis2: {
      constrain: 'domain'
    },
    yaxis2: {
      scaleanchor: 'x2'
    }
  };

  const config = { responsive: true }

  Plotly.newPlot("plot-reduction", data, layout, config);
}

export default dplots;