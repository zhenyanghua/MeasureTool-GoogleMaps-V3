import css from 'index.scss';
import {Config} from './config';
import ContextMenu from './context-menu';
import {select, selectAll, event} from 'd3-selection';
import ProjectionUtility from './projection-utility';
import {geoPath, geoTransform} from 'd3-geo';
import {Geometry, Path} from 'geometry';
import {drag} from 'd3-drag';
import Helper from './helper';
/**
 * TODO - change hover effect to tickPath
 * TODO - change path drag effect on tickPath, and the drag should change the segment between two Nodes NOT ticks.
 * TODO - when dragging, the tickPath should interpolate its segment.
 *
 *
 * TODO - for every 10 ticks, create a text label for the accumulative length.
 *
 * TODO - performance enhance - interpolatePointsOnPath O(n * m) -> O(n)?
 * TODO - performance enhance - getPointOnPath O(n) -> O(1)?
 */
export default class MeasureTool {
  get version() { return `${Config.prefix}-v${Config.version}`; };

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
    this._map.setOptions({draggableCursor: 'default'});
  }

  _endMeasure() {
    console.log("end measure");
    this._contextMenu.toggleItems([this._startElementNode], [this._endElementNode]);

    google.maps.event.clearListeners(this._map, 'click');
    google.maps.event.clearListeners(this._map, 'zoom_changed');
    this._geometry = new Geometry();
    this._onRemoveOverlay();
    this._setOverlay();
    this._map.setOptions({draggableCursor: null});
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

    this._pathBase = this._svgOverlay
      .append('g').attr('class', 'base');
    this._pathBase
      .selectAll("path")
      .data(this._geometry ? this._geometry.paths : []);

    this._pathAux = this._svgOverlay
      .append('g').attr('class', 'aux');
    this._pathAux
      .selectAll("path")
      .data(this._geometry ? this._geometry.paths : []);

    this._tickPath = this._svgOverlay
      .append('g').attr('class', 'tickPath');
    this._tickPath
      .selectAll("path");

    this._ticks = this._svgOverlay
      .append('g').attr('class', 'ticks');
    this._ticks
      .append("marker")
      .attr('id', 'marker-small-ticks')
      .attr('markerHeight', 5)
      .attr('markerWidth', 2)
      .attr('markerUnits', 'strokeWidth')
      .attr('orient', 'auto')
      .attr('refX', 0)
      .attr('refY', 0)
      .attr('viewBox', '-1 0 2 5')
      .append('path')
        .attr('d', 'M 0,0 m -1,0 L 1,0 L 1,5 L -1,5 Z');

    this._nodeCircles =  this._svgOverlay
      .append('g').attr('class', 'node-circle');
    this._nodeCircles
      .selectAll('circle')
      .data(this._geometry ? this._geometry.nodes : []);

    this._hoverCircle = this._svgOverlay
      .append('g').attr('class', 'hover-circle');
    this._hoverCircle
      .append("circle")
      .attr('class', 'grey-circle')
      .attr('r', 5);

  }

  /**
   * Update svg stuff here
   * @private
   */
  _onDrawOverlay() {
    this._updatePath();
    this._updateTicks();
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
    if(this._nodeCircles.selectAll('circle[r="7"]').size() == 0 &&
       !this._hoverCircle.select("circle").attr('cx')) {
      let latLng = [mouseEvent.latLng.lng(), mouseEvent.latLng.lat()];
      this._geometry.addWayPoints(latLng);
      this._overlay.draw();
    }

  }

  _updateCircles() {
    // join with old data
    let circles = this._nodeCircles.selectAll("circle")
      .data(this._geometry ? this._geometry.nodes : [])
        .attr('class', 'cover-circle')
        .attr('r', 5)
        .attr('cx', d => this._projectionUtility
          .latLngToSvgPoint(d.geometry.coordinates)[0])
        .attr('cy', d => this._projectionUtility
          .latLngToSvgPoint(d.geometry.coordinates)[1])
        .on('mouseover', function(d){select(this).attr('r',6)})
        .on('mouseout', function(d){select(this).attr('r',5)})
        .on('touchstart', function(d){select(this).attr('r',6)})
        .on('touchleave', function(d){select(this).attr('r',5)})
        .call(this._onDragCircle());

    // enter and seat the new data with same style.
    circles
      .enter()
      .append('circle')
        .attr('class', 'cover-circle')
        .attr('r', 5)
        .attr('cx', d => this._projectionUtility
          .latLngToSvgPoint(d.geometry.coordinates)[0])
        .attr('cy', d => this._projectionUtility
          .latLngToSvgPoint(d.geometry.coordinates)[1])
        .on('mouseover', function(d){select(this).attr('r',6)})
        .on('mouseout', function(d){select(this).attr('r',5)})
        .on('touchstart', function(d){select(this).attr('r',6)})
        .on('touchleave', function(d){select(this).attr('r',5)})
        .call(this._onDragCircle());

    this._nodeCircles.selectAll(".removed-circle").remove();
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
    // geoPath uses the projection specified to convert the latlng to
    // svg path coords.
    let gmPath = geoPath().projection(gmTransform);

    // Update the one and the only one path with the new data.
    let pathBase = this._pathBase
      .selectAll("path")
      .data(this._geometry ? this._geometry.paths : [])
        .attr("class", "base-path")
        .attr('d', gmPath);
    // There is no new data in the path collection, we just need to
    // replace the old path data with the new one. so no need to assign
    // the path styles to nothing. just enter the replacement and seat it.
    pathBase
      .enter()
      .append('path');

    pathBase.exit().remove();

    let pathAux = this._pathAux
      .selectAll("path")
      .data(this._geometry ? this._geometry.paths : [])
      .attr("class", "aux-path")
      .attr('d', gmPath)
      .on('mousemove', function(d) {
        self._pointSegment = Helper.getPointOnPath(
          self._projectionUtility.svgPointToLatLng([event.offsetX,  event.offsetY]),
          self._pathsSegments);
        let point = self._projectionUtility.latLngToSvgPoint(self._pointSegment.touchPoint);
        self._updateHoverCirclePosition(point[0], point[1]);
      })
      .on('mouseout', function (d) {
        self._hideHoverCircle();
      })
      .call(self._onDragPath());

    pathAux
      .enter()
      .append('path');

    pathAux.exit().remove();

    this._pathsSegments = this._geometry ? this._geometry.pathSegments : [];
  }

  _updateTicks() {
    let self = this;
    this._computeTickLength();
    let points = Helper.interpolatePointsOnPath(
      this._geometry ? this._geometry.pathSegments : [], this._tickLength, true);
    let paths = [(new Path(points)).toJSON()];
    let gmTransform = geoTransform({
      point: function (x, y) {
        let point = self._projectionUtility.latLngToSvgPoint([x,y]);
        this.stream.point(point[0], point[1]);
      }
    });
    // geoPath uses the projection specified to convert the latlng to
    // svg path coords.
    let gmPath = geoPath().projection(gmTransform);

    // Update the one and the only one path with the new data.
    let path = this._tickPath
      .selectAll("path")
      .data(paths)
      .attr("class", "tick-path")
      .attr('d', gmPath)
      .attr('marker-start', `url(#marker-small-ticks)`)
      .attr('marker-mid', `url(#marker-small-ticks)`)
      .attr('marker-end', `url(#marker-small-ticks)`);

    path
      .enter()
      .append('path');

    path.exit().remove();
  }

  _onDragCircle() {
    let self = this;
    let isDragged = false;

    let circleDrag = drag()
      .on('drag', function (d, i) {
        isDragged = true;

        select(this)
          .attr('cx', event.x)
          .attr('cy', event.y);

        let points = [], paths = [];
        // update path
        let gmTransform = geoTransform({
          point: function (x, y) {
            let point = [];
            if (x === d.geometry.coordinates[0] &&
                y === d.geometry.coordinates[1]) {
              point[0] = event.x;
              point[1] = event.y;
              // prepare for ticks path.
              self._geometry.updateWayPoints(
                i,
                self._projectionUtility.svgPointToLatLng([event.x, event.y]));
              points = Helper.interpolatePointsOnPath(
                self._geometry ? self._geometry.pathSegments : [], self._tickLength, true);
              paths = [(new Path(points)).toJSON()];
            } else {
              point = self._projectionUtility.latLngToSvgPoint([x,y]);
            }
            this.stream.point(point[0], point[1]);
          }
        });
        // geoPath uses the project specified to convert the latlng to
        // svg path coords.
        let gmPath = geoPath().projection(gmTransform);
        self._pathBase.selectAll("path")
          .attr('d', gmPath);
        self._pathAux.selectAll("path")
          .attr('d', gmPath);
        self._tickPath.selectAll("path")
          .data(paths);
        self._updateTicks();
      });

    circleDrag.on('start', function(d) {
      event.sourceEvent.stopPropagation();
      select(this).raise().attr('r', 7);
      self._disableMapScroll();
    });

    circleDrag.on('end', function (d, i) {
      self._enableMapScroll();
      if (!isDragged) {
        self._geometry.removeWayPoints(i);
        select(this).classed('removed-circle', true);
      } else {
        self._geometry.updateWayPoints(
          i,
          self._projectionUtility.svgPointToLatLng([event.x, event.y]));
      }
      isDragged = false;
      self._overlay.draw();
    });

    return circleDrag;
  }

  _onDragPath() {
    let self = this;
    let isDragged = false;
    let pathDrag = drag()
      .on('drag', (d, i) => {
        let points = [], paths = [];
        if (!isDragged) {
          isDragged = true;
          this._geometry.insertWayPoints(
            this._pointSegment.segmentIndex + 1,
            this._projectionUtility.svgPointToLatLng([event.x, event.y]));

          this._pathBase.selectAll("path")
            .data(this._geometry ? this._geometry.paths : []);
          this._pathAux.selectAll("path")
            .data(this._geometry ? this._geometry.paths : []);
        }
        this._updateHoverCirclePosition(event.x, event.y);
        let gmTransform = geoTransform({
          point: function(x, y) {
            let point = [];
            let index = self._pointSegment.segmentIndex + 1;
            if (x === d.geometry.coordinates[index][0] &&
              y === d.geometry.coordinates[index][1]) {
              point[0] = event.x;
              point[1] = event.y;
              // prepare for ticks path.
              self._geometry.updateWayPoints(
                index,
                self._projectionUtility.svgPointToLatLng([event.x, event.y]));
              points = Helper.interpolatePointsOnPath(
                self._geometry ? self._geometry.pathSegments : [], self._tickLength, true);
              paths = [(new Path(points)).toJSON()];
            } else {
              point = self._projectionUtility.latLngToSvgPoint([x,y]);
            }
            this.stream.point(point[0], point[1]);
          }
        });
        let gmPath = geoPath().projection(gmTransform);
        // update path
        this._pathBase.selectAll("path")
          .attr('d', gmPath);
        this._pathAux.selectAll("path")
          .attr('d', gmPath);
        self._tickPath.selectAll("path")
          .data(paths);
        self._updateTicks();
      });

    pathDrag.on('start', d => {
      event.sourceEvent.stopPropagation();
      this._hoverCircle.select("circle")
        .attr('class', "cover-circle");
      self._disableMapScroll();
    });

    pathDrag.on('end', d => {
      self._enableMapScroll();
      if (isDragged) {
        this._geometry.updateWayPoints(
          this._pointSegment.segmentIndex + 1,
          this._projectionUtility.svgPointToLatLng([event.x, event.y]));
        let points = Helper.interpolatePointsOnPath(
          self._geometry ? self._geometry.pathSegments : [], self._tickLength, true);
        let paths = [(new Path(points)).toJSON()];
        self._tickPath.selectAll("path")
          .data(paths);
        self._updateTicks();
        this._hideHoverCircle();
        this._overlay.draw();
        isDragged = false;
      }
      this._hoverCircle.select("circle")
        .attr('class', "grey-circle");
    });

    return pathDrag;
  }

  _updateHoverCirclePosition(x, y) {
    this._hoverCircle.select("circle")
      .attr('cx', x)
      .attr('cy', y);
  }

  _hideHoverCircle() {
    this._hoverCircle.select("circle")
      .attr('cx', null)
      .attr('cy', null);
  }

  _disableMapScroll() {
    this._map.setOptions({ scrollwheel: false, zoomControl: false });
  }

  _enableMapScroll() {
    this._map.setOptions({ scrollwheel: true, zoomControl: true });
  }

  _computeTickLength() {
    let metersPerPixel = 156543.03392 * Math.cos(this._map.getCenter().lat() * Math.PI / 180)
      / Math.pow(2, this._map.getZoom());
    this._tickLength = metersPerPixel * 30;
  }
};
