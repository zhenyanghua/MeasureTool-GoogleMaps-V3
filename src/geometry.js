export class Geometry {
  get nodes() { return this._nodes; }
  get paths() { return [this._path.toJSON()]; }
  get pathSegments() {
    let segments = [];
    if (this._path.coords.length > 1) {
      for (let i = 1; i < this._path.coords.length; i++) {
        segments.push([this._path.coords[i - 1], this._path.coords[i]]);
      }
    }
    return segments;
  }

  constructor() {
    this._path = new Path();
    this._nodes = [];
  }

  toJSON() {
    return {
      "type": "FeatureCollection",
      "paths": [this._path.toJSON()],
      "nodes": this._nodes
    };
  }

  addNode(node) {
    this._nodes.push(node.toJSON());
  }

  addWayPoints(point) {
    this._path.addWayPoint(point);
    this.addNode(new Node(point));
  }

  updateWayPoints(curPoint, newPoint) {
    for (var i = 0; i < this._nodes.length; i++) {
      if (this._nodes[i].geometry.coordinates[0] === curPoint[0] &&
        this._nodes[i].geometry.coordinates[1] === curPoint[1]) {
        this._nodes[i].geometry.coordinates = newPoint;
        this._path.updateWayPoint(i, newPoint);
        return;
      }
    }
  }

  removeWayPoints(i) {
    this._nodes.splice(i, 1);
    this._path.removeWayPoint(i);
  }

}

export class Node {
  constructor(coords, label) {
    this._coords = coords;
    this._label = label || "A node";
  }

  toJSON() {
    return {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": this._coords
      },
      "properties": {
        "name": this._label
      }
    };
  }
}

export class Path {
  get coords() { return this._coords; }

  constructor(distance) {
    this._coords = [];
    this._distance = distance || 0;
  }

  addWayPoint(point) {
    this._coords.push(point);
  }

  updateWayPoint(index, newPoint) {
    this._coords[index] = newPoint;
  }

  removeWayPoint(index) {
    this._coords.splice(index, 1);
  }

  toJSON() {
    return {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": this._coords
      },
      "properties": {
        "distance": this._distance
      }
    };
  }
}