export class Geometry {
  get nodes() { return this._nodes; }
  get paths() { return [this._path.toJSON()]; }

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
  constructor(distance) {
    this._coords = [];
    this._distance = distance || 0;
  }

  addWayPoint(point) {
    this._coords.push(point);
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