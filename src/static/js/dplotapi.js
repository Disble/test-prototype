import DotCSV from './dotcsv.js';
import DotJSON from './dotjson.js';
import utils from './utils.js';

// shereLabel.csv plotear en 3D
const dplotapi = async ({ kernel } = {}) => {
  const sphere3DCSV = await utils.csvRequest('../csv/sphereLabel.csv');
  const sphere3DOriginal = new DotCSV(sphere3DCSV, ['X', 'Y', 'Z']);

  const trace1 = {
    x: sphere3DOriginal.x,
    y: sphere3DOriginal.y,
    z: sphere3DOriginal.z,
    marker: {
      size: 2,
      color: sphere3DOriginal.getColors('Label'),
      colorscale: 'Reds',
      line: { color: 'transparent' }
    },
    mode: 'markers',
    type: 'scatter3d',
    // text: sphere3D.getColumn('iris'),
    hoverinfo: 'x+y+z+text',
    showlegend: false,
  };

  const data = [trace1];

  const layout = {
    paper_bgcolor: 'white',
    title: 'Original',
    font: { color: 'rgb(42 59 71)', family: 'Open Sans' },
    grid: {
      rows: 1,
      columns: 1,
      pattern: 'independent',
    },
  };

  const config = { responsive: true }

  Plotly.newPlot("plot-reduction-original", data, layout, config);
}

export default dplotapi;