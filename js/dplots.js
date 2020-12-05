import DotCSV from './dotcsv.js';
import utils from './utils.js';

const dplots = async () => {
  const sphere2DCSV = await utils.csvRequest('../csv/MDSRDLabeled.csv');
  const sphere3DCSV = await utils.csvRequest('../csv/sphereLabel.csv');

  const sphere2D = new DotCSV(sphere2DCSV, ['X', 'Y']);
  const sphere3D = new DotCSV(sphere3DCSV, ['X', 'Y', 'Z']);

  const trace1 = {
    x: sphere3D.x,
    y: sphere3D.y,
    z: sphere3D.z,
    marker: {
      size: 2,
      color: sphere3D.getColors('Label'),
      colorscale: 'Reds',
      line: { color: 'transparent' }
    },
    mode: 'markers',
    type: 'scatter3d',
    text: sphere3D.getColumn('iris'),
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
    font: { color: 'black' },
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
    // autosize: false,
  };

  const config = { responsive: true }

  Plotly.newPlot("plot-reduction", data, layout, config);
}

export default dplots;