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
}