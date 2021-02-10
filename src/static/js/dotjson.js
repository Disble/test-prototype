
/**
 * Clase DotCSV
 * 
 * Visitad su canal: https://www.youtube.com/channel/UCy5znSnfMsDwaLlROnZ7Qbg
 */
export default class DotJSON {
  _setColors = ['red', 'blue', 'green', 'yellow', 'brown', 'pink', 'orchid',
    'mediumslateblue', 'orangered', 'darkgreen', 'steelblue', 'sandybrown',
    'maroon', 'slategrey', 'teal'];

  /**
   * Constructor de la clase DotCSV
   * @param {any[]} rows Filas de datos del csv.
   * @param {string[]|string} labels Etiquetas con el nombre de cada columna de
   * los datos del csv. Puede tener dos valores:
   *
   * - Puede ser un array de strings con los nombres de las etiquetas
   * correspondientes a `X`, `Y` y `Z`; estas columnas pueden ser accedidas
   * después por los getter `csv.x`, `csv.y` y `csv.z`.
   * - o un string con el valor `auto`; asigna automáticamente todas las
   * etiquetas de la primera fila, con esta opción no se puede acceder a los
   * getters de `csv.x`, `csv.y` y `csv.z`.
   */
  constructor(rows, labels = ['x', 'y', 'z', 'labels']) {
    this._rows = rows;

    if (typeof labels === 'string') {
      if (labels === 'auto') {
        this._labelsRaw = Object.keys(rows[0]);
        return;
      }
      throw new Error(`String debe tener el valor "auto"`);
    }
    this._labelsRaw = labels;
    [this._x, this._y, this._z, this._labels] = this._labelsRaw;
  }
  /**
   * Retorna la columna de datos con el nombre de etiqueta proporcionada.
   * @param {any[]} rows Filas de datos del csv.
   * @param {string} label Nombre de la etiqueta de la columna a obtener.
   */
  _unpack(rows, label) {
    return rows.map(row => row[label])
  }

  /**
   * Ordena de forma aleatoria los elementos del array proporcionado.
   * @param {any[]} a Cualquier array.
   */
  _shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  getColors(label, random = false) {
    const colors = {};
    let setColorsCopy = this._copyColors();

    // console.log('set', setColorsCopy);

    const colorsList = {};

    for (const color of this._unpack(this._rows, label)) {
      if (colors[color]) {
        colors[color].push(color);
      } else {
        colors[color] = [];
        colors[color].push(color);
        if (random) {
          colorsList[color] = this._getColorRandom();
        } else {
          if (setColorsCopy.length === 0) {
            setColorsCopy = this._copyColors();
          }
          colorsList[color] = setColorsCopy.pop();
        }

      }
    }

    const pointColors = []

    for (const color of this._unpack(this._rows, label)) {
      pointColors.push(colorsList[color]);
    }

    return pointColors;

  }

  getColumn(label) {
    return this._unpack(this._rows, label);
  }

  getAllLabels() {
    return this._labelsRaw;
  }

  getAllData() {
    return this._rows;
  }

  _copyColors() {
    return [...this._setColors];
  }

  _getColorRandom(transparent = 1) {
    return `rgba(${this._getRandom()}, ${this._getRandom()}, ${this._getRandom()}, ${transparent})`;
  }

  _getRandom() {
    return Math.abs(Math.round(Math.random() * 255) - Math.round(Math.random() * 85));
  }

  get labels() {
    return this._labelsRaw;
  }

  get rows() {
    return this._rows;
  }

  get x() {
    return this._unpack(this._rows, this._x);
  }

  get y() {
    return this._unpack(this._rows, this._y);
  }

  get z() {
    return this._unpack(this._rows, this._z)
  }
}
