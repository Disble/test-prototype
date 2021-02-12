import DotCSV from './dotcsv.js';

/**
 * Clase DotJSON
 */
export default class DotJSON extends DotCSV {
  constructor({ dataset, labels: { x, y, z } }) {
    super(dataset, [x, y, z]);
  }

  /**
   * Retorna la columna de datos con el nombre de etiqueta proporcionada.
   * @param {any[]} rows Filas de datos del json.
   * @param {string} label Nombre de la etiqueta de la columna a obtener.
   */
  _unpack(rows, label) {
    return rows[label];
  }
}
