import css from 'index.scss';
import {Config} from './config';
import ContextMenu from './context-menu';
import {select, selectAll} from 'd3-selection';
import ProjectionUtility from './projection-utility';
import {geoPath, geoTransform} from 'd3-geo';
import {Geometry} from 'geometry';

export default class MeasureTool {
  constructor(map) {
    this._map = map;
    this._map.setClickableIcons(false);
    this._init();
  }

  _init() {
    this._contextMenu = new ContextMenu(this._map.getDiv(), { width: 160 });
    this._startElementNode = this._contextMenu.addItem("Measure distance", true, this._startMeasure, this);
    this._endElementNode = this._contextMenu.addItem("Clear measurement", false, this._endMeasure, this);

    this._overlay = new google.maps.OverlayView();
    this._setOverlay();
    this._bindToggleContextMenu();
  }

  _bindToggleContextMenu() {
    this._map.addListener('rightclick', mouseEvent => {
      this._firstClick = mouseEvent;
      this._contextMenu.show(this._projection.fromLatLngToContainerPixel(mouseEvent.latLng));
    });
    document.addEventListener('keydown', event => {
      if (event.which === 27) {
        this._contextMenu.hide();
      }
    });
    this._map.getDiv().addEventListener('mousedown', event => {
      if (event.clientX >= this._contextMenu.left &&
          event.clientX <= this._contextMenu.left + this._contextMenu.width &&
          event.clientY >= this._contextMenu.top &&
          event.clientY <= this._contextMenu.top + this._contextMenu.height) {
        return;
      }
      this._contextMenu.hide();
    });
  }

  _startMeasure() {
    console.log("start measure");
    this._geometry = new Geometry();
    this._checkClick(this._firstClick);
    this._contextMenu.toggleItems([this._endElementNode], [this._startElementNode]);

    this._map.addListener('click', mouseEvent => this._checkClick(mouseEvent));
    this._map.addListener('zoom_changed', () => this._redrawOverlay());
  }

  _endMeasure() {
    console.log("end measure");
    this._contextMenu.toggleItems([this._startElementNode], [this._endElementNode]);

    google.maps.event.clearListeners(this._map, 'click');
    google.maps.event.clearListeners(this._map, 'resize');
    this._geometry = new Geometry();
    this._onRemoveOverlay();
    this._setOverlay();

  }

  _setOverlay() {
    this._overlay.onAdd = this._onAddOverlay.bind(this);
    this._overlay.draw = this._onDrawOverlay.bind(this);
    this._overlay.onRemove = this._onRemoveOverlay.bind(this);
    this._overlay.setMap(this._map);
  }

  _onAddOverlay() {
    this._projection = this._overlay.getProjection();
    this._projectionUtility = new ProjectionUtility(this._map.getDiv(), this._projection);
    // Add svg to Pane
    this._svgOverlay = select(this._overlay.getPanes().overlayMouseTarget)
      .append('div').attr('id', `${Config.prefix}-svg-container`).attr('class',`${Config.prefix}-measure-points`)
      .append('svg').attr('class',`${Config.prefix}-svg-overlay`);

    this._svgOverlay
      .selectAll("path")
      .data(this._geometry ? this._geometry.path : []);

    this._svgOverlay
      .selectAll('circle')
      .data(this._geometry ? this._geometry.nodes : []);
  }

  /**
   * Update svg stuff here
   * @private
   */
  _onDrawOverlay() {
    this._updatePath();
    this._updateCircles();
  }

  _onRemoveOverlay() {
    select(`.${Config.prefix}-measure-points`).remove();
  }

  /**
   * In some cases we must redraw overlay so the svg container size gets recomputed
   * whenever the map scale changes. we usually bind this map resize or similar events.
   * @private
   */
  _redrawOverlay() {
    this._onRemoveOverlay();
    this._setOverlay();
    this._overlay.draw();
  }

  _checkClick(mouseEvent){
    // Use circle radius 'r' as a flag to determine if it is a delete or add event.
    if(selectAll('circle[r="7"]').size() == 0){
      let latLng = [mouseEvent.latLng.lng(), mouseEvent.latLng.lat()];
      this._geometry.addWayPoints(latLng);
    }
    this._overlay.draw();
  }

  _updateCircles() {
    // join with old data
    let circles = this._svgOverlay.selectAll("circle")
      .data(this._geometry ? this._geometry.nodes : []);
    // enter and seat the new data with same style.
    circles
      .enter()
      .append('circle')
        .attr('class', 'cover-circle')
        .style('fill', 'white')
        .style('stroke', 'black')
        .style('stroke-width', '2.5px')
        .attr('r', 5)
        .attr('cx', d => this._projectionUtility
          .latLngToSvgPoint(d.geometry.coordinates)[0])
        .attr('cy', d => this._projectionUtility
          .latLngToSvgPoint(d.geometry.coordinates)[1])
        .on('mouseover', function(d){select(this).attr('r',7)})
        .on('mouseout', function(d){select(this).attr('r',5)})
        .on('touchstart', function(d){select(this).attr('r',7)})
        .on('touchleave', function(d){select(this).attr('r',5)})
    // .on('mousedown', d => this.origin_point =
    //   [d.geometry.coordinates[d.geometry.coordinates.length-1][0],
    //    d.geometry.coordinates[d.geometry.coordinates.length-1][1]])
    // .call(this._dragCallback())

    circles.exit().remove();
  }

  _updatePath() {
    // Create a generic transformation,
    // geoTransform implements the project.stream which can be
    // used in the geoPath.projection.
    let self = this;
    let gmTransform = geoTransform({
      point: function (x, y) {
        let point = self._projectionUtility.latLngToSvgPoint([x,y]);
        this.stream.point(point[0], point[1]);
      }
    });
    // geoPath uses the project specified to convert the latlng to
    // svg path coords.
    let gmPath = geoPath().projection(gmTransform);

    // Update the one and the only one path with the new data.
    let path = this._svgOverlay.selectAll("path")
      .data(this._geometry ? this._geometry.paths : [])
        .style('fill','none')
        .style('stroke','black')
        .style('stroke-width','2.5px')
        .attr('d', gmPath)
    // There is no new data in the path collection, we just need to
    // replace the old path data with the new one. so no need to assign
    // the path styles to nothing. just enter the replacement and seat it.
    path
      .enter()
      .append('path')

    path.exit().remove();
  }
};
