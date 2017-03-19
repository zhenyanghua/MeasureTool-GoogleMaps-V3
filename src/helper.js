export default class Helper {
  constructor(specification) {
    this._options = {
      unit: 'metric'
    };
    Object.assign(this._options, specification);
    this.init()
  }

  init() {
    switch (this._options.unit.toLowerCase()) {
      case 'metric':
        this._lengthMultiplier = 1;
        this._formatLength = this._formatLengthMetric;
        break;
      case 'imperial':
        this._lengthMultiplier = 1 / 1609.344;
        this._formatLength = this._formatLengthImperial;
        break;
      default:
        this._lengthMultiplier = 1;
        this._formatLength = this._formatLengthMetric;
        break;
    }
  }

  static findTouchPoint(segment, point) {
    const k = ((segment[1][1] - segment[0][1]) * (point[0] - segment[0][0]) -
               (segment[1][0] - segment[0][0]) * (point[1] - segment[0][1])) /
              (Math.pow(segment[1][1] - segment[0][1], 2) +
               Math.pow(segment[1][0] - segment[0][0], 2));
    return [
      point[0] - k * (segment[1][1] - segment[0][1]),
      point[1] + k * (segment[1][0] - segment[0][0])
    ];
  }

  static findMidPoint(segment) {
    return [
      (segment[0][0] + segment[1][0]) / 2,
      (segment[0][1] + segment[1][1]) / 2
    ];
  }
  /**
   * Calculate the distance in meters between two points.
   * @param p1
   * @param p2
   * @return {*}
   */
  computeLengthBetween(p1, p2) {
    return this._formatLength(google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(p1[1], p1[0]),
      new google.maps.LatLng(p2[1], p2[0])
    ) * this._lengthMultiplier);
  }

  computePathLength(points) {
    let sum = 0;
    for (let i = 1; i < points.length; i++) {
      sum += google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(points[i - 1][1], points[i - 1][0]),
        new google.maps.LatLng(points[i][1], points[i][0])
      );
    }
    return this._formatLength(sum * this._lengthMultiplier);
  }

  _formatLengthMetric(value) {
    let unit;
    if (value / 1000 >= 1) {
      unit = 'km';
      value /= 1000;
    } else {
      unit = 'm';
    }
    return this._roundUp(value, 2).toLocaleString() + ' ' + unit;
  }

  _formatLengthImperial(value) {
    let unit;
    if (value / 5280 >= 1) {
      unit = 'mi';
      value /= 5280;
    } else {
      unit = 'ft';
    }
    return this._roundUp(value, 2).toLocaleString() + ' ' + unit;
  }

  _roundUp(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals);
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