import { UnitTypeId } from './UnitTypeId';
export default class Helper {
  constructor(options) {
    this._options = {
      unit: UnitTypeId.METRIC,
    };
    Object.assign(this._options, options);
    this.init();
  }

  init() {
    this.initUnits();
  }

  static findTouchPoint(segment, point) {
    const k =
      ((segment[1][1] - segment[0][1]) * (point[0] - segment[0][0]) -
        (segment[1][0] - segment[0][0]) * (point[1] - segment[0][1])) /
      (Math.pow(segment[1][1] - segment[0][1], 2) +
        Math.pow(segment[1][0] - segment[0][0], 2));
    return [
      point[0] - k * (segment[1][1] - segment[0][1]),
      point[1] + k * (segment[1][0] - segment[0][0]),
    ];
  }

  static findMidPoint(segment) {
    return [
      (segment[0][0] + segment[1][0]) / 2,
      (segment[0][1] + segment[1][1]) / 2,
    ];
  }

  static transformText(p1, p2) {
    let mid = Helper.findMidPoint([p1, p2]);
    let angle;
    if (p1[0] === p2[0]) {
      if (p2[1] > p1[1]) angle = 90;
      else if (p2[1] < p1[1]) angle = 270;
      else angle = 0;
    } else {
      angle = (Math.atan((p2[1] - p1[1]) / (p2[0] - p1[0])) * 180) / Math.PI;
    }
    return `translate(${mid[0]}, ${mid[1]}) rotate(${angle})`;
  }

  static makeId(n) {
    return (Math.random().toString(36) + '00000000000000000').slice(2, n + 2);
  }

  initUnits() {
    switch (this._options.unit.toLowerCase()) {
      case UnitTypeId.METRIC:
        this._lengthMultiplier = 1;
        this.formatLength = this._formatLengthMetric;
        this._areaMultiplier = 1;
        this.formatArea = this._formatAreaMetric;
        break;
      case UnitTypeId.IMPERIAL:
        this._lengthMultiplier = 3.28084;
        this.formatLength = this._formatLengthImperial;
        this._areaMultiplier = 10.7639;
        this.formatArea = this._formatAreaImperial;
        break;
      case UnitTypeId.NAUTICAL:
        this._lengthMultiplier = 1;
        this.formatLength = this._formatLengthNautical;
        this._areaMultiplier = 1;
        this.formatArea = this._formatAreaMetric;
        break;
      default:
        this._lengthMultiplier = 1;
        this.formatLength = this._formatLengthMetric;
        this._areaMultiplier = 1;
        this.formatArea = this._formatAreaMetric;
        break;
    }
  }

  /**
   * Updates a configuration option with a new value.  This is passed from the main index.js setOption function
   * @param option - option to update
   * @param value - value to set
   */
  setOption(option, value) {
    if (!this._options[option]) {
      throw new Error(`${option} is not a valid option on MeasureTool helper`);
    }

    // TODO: figure out some option validation
    this._options[option] = value;

    this.initUnits();
  }

  /**
   * Calculate the distance in meters between two points.
   * @param p1
   * @param p2
   * @return {*}
   */
  computeLengthBetween(p1, p2) {
    return (
      google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(p1[1], p1[0]),
        new google.maps.LatLng(p2[1], p2[0])
      ) * this._lengthMultiplier
    );
  }

  computePathLength(points) {
    let sum = 0;
    for (let i = 1; i < points.length; i++) {
      sum += google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(points[i - 1][1], points[i - 1][0]),
        new google.maps.LatLng(points[i][1], points[i][0])
      );
    }
    return sum * this._lengthMultiplier;
  }

  computeArea(points) {
    return (
      google.maps.geometry.spherical.computeArea(
        points.map((p) => new google.maps.LatLng(p[1], p[0]))
      ) * this._areaMultiplier
    );
  }

  _formatLengthMetric(value) {
    let unit;
    if (value / 1000 >= 1) {
      unit = 'km';
      value /= 1000;
    } else {
      unit = 'm';
    }
    return this._numberToLocale(this._roundUp(value, 2)) + ' ' + unit;
  }

  _formatLengthImperial(value) {
    let unit;
    if (value / 5280 >= 1) {
      unit = 'mi';
      value /= 5280;
    } else {
      unit = 'ft';
    }
    return this._numberToLocale(this._roundUp(value, 2)) + ' ' + unit;
  }

  _formatLengthNautical(value) {
    let unit = 'NM';
    value /= 1852;
    return this._numberToLocale(this._roundUp(value, 2)) + ' ' + unit;
  }

  _formatAreaMetric(value) {
    let unit;
    if (value / 1000000 >= 1) {
      unit = 'km²';
      value /= 1000000;
    } else {
      unit = 'm²';
    }
    return this._numberToLocale(this._roundUp(value, 2)) + ' ' + unit;
  }

  _formatAreaImperial(value) {
    let unit;
    if (value * 3.587e-8 >= 1) {
      unit = 'mi²';
      value *= 3.587e-8;
    } else {
      unit = 'ft²';
    }
    return this._numberToLocale(this._roundUp(value, 2)) + ' ' + unit;
  }

  _roundUp(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(
      decimals
    );
  }

  _numberToLocale(number) {
    return new Intl.NumberFormat().format(number);
  }

  /**
   * Calculate the LatLng which lies the given fraction of the way between the origin LatLng and the destination LatLng.
   * @param p1
   * @param p2
   * @param fraction
   * @return {*}
   * @private
   */
  static _interpolate(p1, p2, fraction) {
    let point = google.maps.geometry.spherical.interpolate(
      new google.maps.LatLng(p1[1], p1[0]),
      new google.maps.LatLng(p2[1], p2[0]),
      fraction
    );
    return [point.lng(), point.lat()];
    // use interception equation y = mx + b
    // let m = (p2[1] - p1[1]) / (p2[0] - p1[0]);
    // let b = p1[1] - m * p1[0];
    // let x = p1[0] + (p2[0] - p1[0]) * fraction;
    // let y = m * x + b;
    // return [x, y];
  }
}
