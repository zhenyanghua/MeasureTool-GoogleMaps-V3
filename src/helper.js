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

  /**
   * if last segment length (start with 0) adds current segment length is less than tick length,
   *    segment length = last segment length + segment length
   *    last segment length = segment length;
   *    move on to the next segment
   *
   * current point = compute the latlng using fraction (tick length - last segment length ) / current segment length
   *     between current segment start point and end point.
   * segment length = segment length - (tick length - last segment length)
   *
   * While the given minimum tick length is less than the segment length,
   *    compute the latlng at the fraction between current point and the end point.
   *    push the latlng
   *    assign the latlng to current point.
   *    segment length subtracts tick length.
   *
   * @param segments
   * @param length
   * @param includeSegmentNodes
   */
  static interpolatePointsOnPath(segments, length, includeSegmentNodes = false) {
    if (segments.length === 0) return [];
    let lastSegmentLength = 0, curPoint = segments[0][0], points = [];
    for (let i = 0; i < segments.length; i++) {
      if (includeSegmentNodes) points.push(segments[i][0]);
      let segmentLength = this._getlengthBetween(segments[i][0], segments[i][1]);
      if (lastSegmentLength + segmentLength < length) {
        segmentLength += lastSegmentLength;
        lastSegmentLength = segmentLength;
        continue;
      }
      curPoint = this._interpolate(
        segments[i][0],
        segments[i][1],
        (length - lastSegmentLength) / segmentLength);
      segmentLength -= (length - lastSegmentLength);
      points.push(curPoint);
      while(length < segmentLength) {
        curPoint = this._interpolate(curPoint, segments[i][1], length / segmentLength);
        points.push(curPoint);
        segmentLength -= length;
        lastSegmentLength = segmentLength;
      }
    }
    if (includeSegmentNodes) points.push(segments[segments.length - 1][1]);
    return points;
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
    // use interception equation y = mx + b
    let m = (p2[1] - p1[1]) / (p2[0] - p1[0]);
    let b = p1[1] - m * p1[0];
    let x = p1[0] + (p2[0] - p1[0]) * fraction;
    let y = m * x + b;
    return [x, y];
  }
}