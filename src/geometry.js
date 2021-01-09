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
}
