export default class Helper {
  static debounce(cb, deley, context = this) {
    let timeout = null;
    let cbArgs = null;
    const later = () => cb.apply(context, cbArgs);

    return function () {
      cbArgs = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(later, deley);
    };
  }

  static getPointOnPath(point, segments) {
    let minDistance = Infinity, closestPoint = [null, null], segmentIndex;
    if (segments.length > 0) {
      for (let i = 0; i < segments.length; i++) {
        let touchPoint = this._findTouchPoint(segments[i], point);
        let sqDistance = Math.pow(touchPoint[0] - point[0], 2) + Math.pow(touchPoint[1] - point[1], 2);
        if (sqDistance < minDistance) {
          minDistance = sqDistance;
          closestPoint = touchPoint;
          segmentIndex = i;
        }
      }
    }
    return {
      touchPoint: closestPoint,
      segmentIndex: segmentIndex
    };
  }

  static _findTouchPoint(segment, point) {
    const k = ((segment[1][1] - segment[0][1]) * (point[0] - segment[0][0]) -
               (segment[1][0] - segment[0][0]) * (point[1] - segment[0][1])) /
              (Math.pow(segment[1][1] - segment[0][1], 2) +
               Math.pow(segment[1][0] - segment[0][0], 2));
    return [
      point[0] - k * (segment[1][1] - segment[0][1]),
      point[1] + k * (segment[1][0] - segment[0][0])
    ];
  }

  /**
   * Calculate the distance in meters between two points.
   * @param p1
   * @param p2
   * @return {*}
   * @private
   */
  static _getlengthBetween(p1, p2) {
    return google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(p1[1], p1[0]),
      new google.maps.LatLng(p2[1], p2[0])
    );
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