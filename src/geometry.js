export class Geometry {
  get nodes() {
    return Object.assign([], this._nodes);
  }
  get lines() {
    let segments = [];
    if (this._nodes.length > 1) {
      for (let i = 1; i < this._nodes.length; i++) {
        segments.push([this._nodes[i - 1], this._nodes[i]]);
      }
    }
    return segments;
  }

  static toLineString(points) {
    return {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": points
      }
    }
  }

  constructor() {
    this._nodes = [];
  }

  addNode(point) {
    this._nodes.push(point);
  }

  updateNode(i, newPoint) {
    this._nodes[i] = newPoint;
  }

  removeNode(i) {
    this._nodes.splice(i, 1);
  }

  insertNode(i, point) {
    this._nodes.splice(i, 0, point);
  }

  static equals(segments1, segments2) {
    if (segments1.length !== segments2.length) {
      return false;
    }
    for (let i = 0; i < segments1.length; i++) {
      if (segments1[i][0][0] !== segments2[i][0][0] ||
        segments1[i][0][1] !== segments2[i][0][1] ||
        segments1[i][1][0] !== segments2[i][1][0] ||
        segments1[i][1][1] !== segments2[i][1][1]) {
        return false;
      }
    }
    return true;
  }

}
