import css from 'index.scss';
import {Config} from './config';
import ContextMenu from './context-menu';
import {select, event} from 'd3-selection';
import ProjectionUtility from './projection-utility';
import {Geometry} from 'geometry';
import {drag} from 'd3-drag';
import Helper from './helper';

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

    this._linesBase = this._svgOverlay
      .append('g').attr('class', 'base');
    this._linesBase
      .selectAll("line")
      .data(this._geometry ? this._geometry.lines : []);

    this._linesAux = this._svgOverlay
      .append('g').attr('class', 'aux');
    this._linesAux
      .selectAll("line")
      .data(this._geometry ? this._geometry.lines : []);

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
    this._updateCircles();
    this._updateLine();
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
      this._geometry.addNode(latLng);
      this._overlay.draw();
    }

  }

  _updateCircles() {
    // join with old data
    let circles = this._nodeCircles.selectAll("circle")
      .data(this._geometry ? this._geometry.nodes : [])
        .attr('class', 'cover-circle')
        .attr('r', 5)
        .attr('cx', d => this._projectionUtility.latLngToSvgPoint(d)[0])
        .attr('cy', d => this._projectionUtility.latLngToSvgPoint(d)[1])
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
        .attr('cx', d => this._projectionUtility.latLngToSvgPoint(d)[0])
        .attr('cy', d => this._projectionUtility.latLngToSvgPoint(d)[1])
        .on('mouseover', function(d){select(this).attr('r',6)})
        .on('mouseout', function(d){select(this).attr('r',5)})
        .on('touchstart', function(d){select(this).attr('r',6)})
        .on('touchleave', function(d){select(this).attr('r',5)})
        .call(this._onDragCircle());

    this._nodeCircles.selectAll(".removed-circle").remove();
  }

  _updateLine() {
    let linesBase = this._linesBase
      .selectAll("line")
      .data(this._geometry ? this._geometry.lines : [])
        .attr("class", "base-line")
        .attr('x1', d => this._projectionUtility.latLngToSvgPoint(d[0])[0])
        .attr('y1', d => this._projectionUtility.latLngToSvgPoint(d[0])[1])
        .attr('x2', d => this._projectionUtility.latLngToSvgPoint(d[1])[0])
        .attr('y2', d => this._projectionUtility.latLngToSvgPoint(d[1])[1]);

    linesBase
      .enter()
      .append('line')
        .attr("class", "base-line")
        .attr('x1', d => this._projectionUtility.latLngToSvgPoint(d[0])[0])
        .attr('y1', d => this._projectionUtility.latLngToSvgPoint(d[0])[1])
        .attr('x2', d => this._projectionUtility.latLngToSvgPoint(d[1])[0])
        .attr('y2', d => this._projectionUtility.latLngToSvgPoint(d[1])[1]);

    linesBase.exit().remove();

    let linesAux = this._linesAux
      .selectAll("line")
      .data(this._geometry ? this._geometry.lines : [])
        .attr("class", "aux-line")
        .attr('x1', d => this._projectionUtility.latLngToSvgPoint(d[0])[0])
        .attr('y1', d => this._projectionUtility.latLngToSvgPoint(d[0])[1])
        .attr('x2', d => this._projectionUtility.latLngToSvgPoint(d[1])[0])
        .attr('y2', d => this._projectionUtility.latLngToSvgPoint(d[1])[1])
      .on('mousemove', d => {
        let point = Helper.findTouchPoint(
          [this._projectionUtility.latLngToSvgPoint(d[0]), this._projectionUtility.latLngToSvgPoint(d[1])],
          [event.offsetX,  event.offsetY]);
        this._updateHoverCirclePosition(point[0], point[1]);
      })
      .on('mouseout', d => this._hideHoverCircle())
      .call(this._onDragLine());

    linesAux
      .enter()
      .append('line')
        .attr("class", "aux-line")
        .attr('x1', d => this._projectionUtility.latLngToSvgPoint(d[0])[0])
        .attr('y1', d => this._projectionUtility.latLngToSvgPoint(d[0])[1])
        .attr('x2', d => this._projectionUtility.latLngToSvgPoint(d[1])[0])
        .attr('y2', d => this._projectionUtility.latLngToSvgPoint(d[1])[1])
        .on('mousemove', d => {
          let point = Helper.findTouchPoint(
            [this._projectionUtility.latLngToSvgPoint(d[0]), this._projectionUtility.latLngToSvgPoint(d[1])],
            [event.offsetX,  event.offsetY]);
          this._updateHoverCirclePosition(point[0], point[1]);
        })
        .on('mouseout', d => this._hideHoverCircle())
        .call(this._onDragLine());

    linesAux.exit().remove();
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
        self._updateLinePosition.call(self, self._linesBase, i);
        self._updateLinePosition.call(self, self._linesAux, i);
      });

    circleDrag.on('start', function(d) {
      event.sourceEvent.stopPropagation();
      select(this).raise().attr('r', 7);
      self._disableMapScroll();
    });

    circleDrag.on('end', function (d, i) {
      self._enableMapScroll();
      if (!isDragged) {
        self._geometry.removeNode(i);
        select(this).classed('removed-circle', true);
      } else {
        self._geometry.updateNode(
          i,
          self._projectionUtility.svgPointToLatLng([event.x, event.y]));
      }
      isDragged = false;
      self._overlay.draw();
    });

    return circleDrag;
  }

  _onDragLine() {
    let isDragged = false;
    let lineDrag = drag()
      .on('drag', (d, i) => {
        if (!isDragged) {
          isDragged = true;
          this._geometry.insertNode(
            i + 1,
            this._projectionUtility.svgPointToLatLng([event.x, event.y]));
          this._updateLine();
        }
        this._updateHoverCirclePosition(event.x, event.y);
        this._updateLinePosition(this._linesBase, i + 1);
        this._updateLinePosition(this._linesAux, i + 1);
      });

    lineDrag.on('start', () => {
      event.sourceEvent.stopPropagation();
      this._hoverCircle.select("circle")
        .attr('class', "cover-circle");
      this._disableMapScroll();
    });

    lineDrag.on('end', (d, i) => {
      this._enableMapScroll();
      if (isDragged) {
        this._geometry.updateNode(
          i + 1,
          this._projectionUtility.svgPointToLatLng([event.x, event.y]));
        this._hideHoverCircle();
        this._overlay.draw();
        isDragged = false;
      }
      this._hoverCircle.select("circle")
        .attr('class', "grey-circle");
    });

    return lineDrag;
  }

  _updateLinePosition(group, i) {
    if (i < this._geometry.lines.length) {
      group.select(`line:nth-child(${i + 1})`)
        .attr('x1', event.x)
        .attr('y1', event.y);
    }
    if (i > 0) {
      group.select(`line:nth-child(${i})`)
        .attr('x2', event.x)
        .attr('y2', event.y);
    }
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
};
