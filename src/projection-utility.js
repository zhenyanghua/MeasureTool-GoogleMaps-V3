export default class ProjectionUtility {
  constructor(div, projection, options) {
    this._defaultOptions = {
      offsetRate: 8000
    };
    this._options = Object.assign({}, this._defaultOptions, options || {});
    this._container = div;
    this._projection = projection;
  }

  latLngToSvgPoint(coords){
    let rate = this._options.offsetRate / 2;
    let latLng = new google.maps.LatLng(coords[1], coords[0]);
    let svgPoint = this._projection.fromLatLngToDivPixel(latLng);
    return [svgPoint.x + rate, svgPoint.y + rate];
  }

  svgPointToLatLng(point){
    let rate = this.options.offsetRate / 2 ;
    let w = this._container.getBoundingClientRect().width;
    let h = this._container.getBoundingClientRect().height;
    let svgPoint = new google.maps.Point(point[0] - rate, point[1] - rate);
    return this._projection.fromDivPixelToLatLng(svgPoint);
  }
};