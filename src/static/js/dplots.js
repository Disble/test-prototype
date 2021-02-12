import DotCSV from './dotcsv.js';
import DotJSON from './dotjson.js';
import utils from './utils.js';

// shereLabel.csv plotear en 3D
const dplots = async ({ kernel } = {}) => {
  console.log("✨ kernel", kernel);
  if (kernel === undefined) return;
  // const jsonTest = await utils.jsonRequest(`http://186.71.197.203:8000/api/kcmds?k1=${kernel.yellow}&k2=${kernel.green}&k3=${kernel.blue}&k4=${kernel.red}`);
  const jsonTest = await utils.jsonRequest(`http://localhost:8000/kcmds`);

  console.log('📋 jsonTest', jsonTest);

  const sphere2DCSV = await utils.csvRequest('../csv/MDSRDLabeled.csv');
  const sphere3DCSV = await utils.csvRequest('../csv/sphereLabel.csv');

  console.log('🎄 sphere3DCSV', sphere3DCSV);

  const sphere2D = new DotCSV(sphere2DCSV, ['X', 'Y']);
  const sphere3DOriginal = new DotCSV(sphere3DCSV, ['X', 'Y', 'Z']);
  const sphere3DNew = new DotJSON({ dataset: jsonTest, labels: { x: 'x', y: 'y', z: 'z' } });

  const trace1 = {
    x: sphere3DNew.x,
    y: sphere3DNew.y,
    z: sphere3DNew.z,
    marker: {
      size: 2,
      color: sphere3DNew.getColors('labels'),
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
    title: 'Reducción de dimensiones',
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
    },
    annotations: [{
      text: "Sin reducir",
      font: {
        size: 16,
        color: 'green',
      },
      showarrow: false,
      align: 'center',
      x: 0.18,
      y: 1.15,
      xref: 'paper',
      yref: 'paper',
    },
    {
      text: "Reducido",
      font: {
        size: 16,
        color: 'orange',
      },
      showarrow: false,
      align: 'center',
      x: 0.81,
      y: 1.15,
      xref: 'paper',
      yref: 'paper',
    }]
  };

  const config = { responsive: true }

  Plotly.newPlot("plot-reduction", data, layout, config);
}

export default dplots;