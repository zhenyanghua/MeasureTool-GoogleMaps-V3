import css from 'index.scss';
import {Config} from './config';
import ContextMenu from './context-menu';
import Tooltip from './tooltip';
import {select, event} from 'd3-selection';
import ProjectionUtility from './projection-utility';
import {Geometry} from 'geometry';
import {drag} from 'd3-drag';
import Helper from './helper';
import {UnitTypeId} from './UnitTypeId';
import {EVENT_START, EVENT_END, EVENT_CHANGE} from './events';

export default class MeasureTool {

  get lengthText() { return this._helper.formatLength(this._length || 0); };
  get areaText() { return this._helper.formatArea(this._area || 0); };
  get length() { return this._length || 0; };
  get area() { return this._area || 0; };

  static get UnitTypeId() { return UnitTypeId};

  constructor(map, options) {
    this._options = {
      showSegmentLength: true,
      showAccumulativeLength: true,
      contextMenu: true,
      tooltip: true,
      unit: UnitTypeId.METRIC
    };
    Object.assign(this._options, options);
    this._map = map;
    this._map.setClickableIcons(false);
    this._id = Helper.makeId(4);
    this._events = new Map();
    this._init();
  }

  _init() {
    if (this._options.contextMenu) {
      this._contextMenu = new ContextMenu(this._map.getDiv(), { width: 160 });
      this._startElementNode = this._contextMenu.addItem("Measure distance", true, this.start, this);
      this._endElementNode = this._contextMenu.addItem("Clear measurement", false, this.end, this);
      this._bindToggleContextMenu();
    }

    if (this._options.tooltip) {
      this._tooltip = new Tooltip(this._map.getDiv());
    }

    this._helper = new Helper({
      unit: this._options.unit
    });
    this._overlay = new google.maps.OverlayView();
    this._setOverlay();
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

  /**
   * start measuring
   */
  start() {
    if (this._started) return;
    this._geometry = new Geometry();

    if (this._options.contextMenu && this._firstClick) {
      this._checkClick(this._firstClick);
      this._contextMenu.toggleItems([this._endElementNode], [this._startElementNode]);
    }

    this._mapClickEvent = this._map.addListener('click', mouseEvent => this._checkClick(mouseEvent));
    this._mapZoomChangedEvent = this._map.addListener('zoom_changed', () => this._redrawOverlay());
    this._map.setOptions({draggableCursor: 'default'});
    this._started = true;

    if (typeof this._events.get(EVENT_START) === "function") {
      this._events.get(EVENT_START)();
    }
  }

  /**
   * end measuring
   */
  end() {
    if (!this._started) return;
    if (this._options.contextMenu) {
      this._contextMenu.toggleItems([this._startElementNode], [this._endElementNode]);
    }

    this._mapClickEvent.remove();
    this._mapZoomChangedEvent.remove();

    this._geometry = new Geometry();
    this._onRemoveOverlay();
    this._setOverlay();
    this._map.setOptions({draggableCursor: null});
    this._started = false;

    if (typeof this._events.get(EVENT_END) === "function") {
      this._events.get(EVENT_END)({
        result: {
          length: this.length,
          lengthText: this.lengthText,
          area: this.area,
          areaText: this.areaText
        }
      });
    }
  }

  /**
   * register an event
   * @param event - available events: 'measure-start', 'measure-end'
   * @param cb - callback function
   */
  addListener(event, cb) {
    this._events.set(event, cb);
  }

  /**
   * unregister an event
   * @param event - available events: 'measure-start', 'measure-end'
   */
  removeListener(event) {
    this._events.delete(event);
  }

    /**
     * Updates a configuration option with a new value
     * @param option - option to update
     * @param value - value to set
     */
  setOption(option, value) {
    if (!this._options[option]) {
      throw new Error(`${option} is not a valid option on MeasureTool`);
    }

    // TODO: figure out some option validation
    this._options[option] = value;

    // if this is an option that exists on the helper, try to set it there as well
    if (this._helper._options[option]) {
      this._helper.setOption(option, value);
    }

    // update any values that might be there
    if (this._overlay && this._nodeCircles) {
      // only do this if there is actually an overlay to re-render
      this._redrawOverlay();
    }

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
      .append('div')
        .attr('class',`${Config.prefix}-measure-points-${this._id}`)
      .append('svg')
        .attr('class',`${Config.prefix}-svg-overlay`);

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

    if (this._options.showSegmentLength) {
      this._segmentText = this._svgOverlay
        .append('g').attr('class', 'segment-text');
      this._segmentText
        .selectAll('text')
        .data(this._geometry ? this._geometry.lines : []);
    }

    if (this._options.showAccumulativeLength) {
      this._nodeText = this._svgOverlay
        .append('g').attr('class', 'node-text');
      this._nodeText
        .selectAll('text')
        .data(this._geometry ? this._geometry.nodes : []);
    }

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
    if (this._options.showSegmentLength) {
      this._updateSegmentText();
    }
    if (this._options.showAccumulativeLength) {
      this._updateNodeText();
    }
    if (this._geometry) {
      this._updateArea(this._geometry.nodes.length - 1,
        this._geometry.nodes[this._geometry.nodes.length - 1]);
    }
    this._dispatchMeasureEvent();
  }

  _onRemoveOverlay() {
    select(`.${Config.prefix}-measure-points-${this._id}`).remove();
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
    if(!this._dragged && this._nodeCircles.selectAll('circle[r="6"]').size() == 0 &&
       !this._hoverCircle.select("circle").attr('cx')) {
      let latLng = [mouseEvent.latLng.lng(), mouseEvent.latLng.lat()];
      this._geometry.addNode(latLng);
      this._overlay.draw();
    }
    this._dragged = false;
  }

  _updateCircles() {
    let self = this;
    // join with old data
    let circles = this._nodeCircles.selectAll("circle")
      .data(this._geometry ? this._geometry.nodes : [])
        .attr('class', (d, i) => i === 0 ? 'cover-circle head-circle' : 'cover-circle')
        .attr('r', 5)
        .attr('cx', d => this._projectionUtility.latLngToSvgPoint(d)[0])
        .attr('cy', d => this._projectionUtility.latLngToSvgPoint(d)[1])
        .on('mouseover', function(d, i){ self._onOverCircle(d, i, this);})
        .on('mouseout', function(d){ self._onOutCircle(d, this);})
        .on('touchstart', function(d, i){ self._onOverCircle(d, i, this);})
        .on('touchleave', function(d){ self._onOutCircle(d, this);})
        .on('mousedown', () => this._hideTooltip())
        .call(this._onDragCircle());

    // enter and seat the new data with same style.
    circles
      .enter()
      .append('circle')
        .attr('class', 'cover-circle')
        .attr('r', 5)
        .attr('cx', d => this._projectionUtility.latLngToSvgPoint(d)[0])
        .attr('cy', d => this._projectionUtility.latLngToSvgPoint(d)[1])
        .on('mouseover', function(d, i){ self._onOverCircle(d, i, this);})
        .on('mouseout', function(d){ self._onOutCircle(d, this);})
        .on('touchstart', function(d, i){ self._onOverCircle(d, i, this);})
        .on('touchleave', function(d){ self._onOutCircle(d, this);})
        .on('mousedown', () => this._hideTooltip())
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
      .on('mousedown', () => this._hideTooltip())
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
        .on('mousedown', () => this._hideTooltip())
        .call(this._onDragLine());

    linesAux.exit().remove();
  }

  _updateSegmentText() {
    let text = this._segmentText.selectAll("text")
      .data(this._geometry ? this._geometry.lines : [])
      .attr('class', 'segment-measure-text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'text-after-edge')
      .attr('transform', d => {
        let p1 = this._projectionUtility.latLngToSvgPoint(d[0]);
        let p2 = this._projectionUtility.latLngToSvgPoint(d[1]);
        return this._doTextTransform(p1, p2);
      })
      .text((d, i) => this._helper.formatLength(this._helper.computeLengthBetween(d[0], d[1])));

    text.enter()
      .append('text')
      .attr('class', 'segment-measure-text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'text-after-edge')
      .attr('transform', d => {
        let p1 = this._projectionUtility.latLngToSvgPoint(d[0]);
        let p2 = this._projectionUtility.latLngToSvgPoint(d[1]);
        return this._doTextTransform(p1, p2);
      })
      .text((d, i) => this._helper.formatLength(this._helper.computeLengthBetween(d[0], d[1])));

    text.exit().remove();
  }

  _updateNodeText() {
    let text = this._nodeText.selectAll("text")
      .data(this._geometry ? this._geometry.nodes : [])
      .attr('class', (d, i) => i === 0 ? 'node-measure-text head-text' : 'node-measure-text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'text-after-edge')
      .attr('x', d => this._projectionUtility.latLngToSvgPoint(d)[0])
      .attr('y', this._transformNodeTextY.bind(this))
      .text((d, i) => {
        let len = this._helper.computePathLength(this._geometry.nodes.slice(0, i + 1));
        if (i === this._geometry.nodes.length - 1) {
          this._length = len;
        }
        return this._helper.formatLength(len);
      });

    text.enter()
      .append('text')
      .attr('class', (d, i) => i === 0 ? 'node-measure-text head-text' : 'node-measure-text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'text-after-edge')
      .attr('x', d => this._projectionUtility.latLngToSvgPoint(d)[0])
      .attr('y', this._transformNodeTextY.bind(this))
      .text((d, i) => {
        let len = this._helper.computePathLength(this._geometry.nodes.slice(0, i + 1));
        if (i === this._geometry.nodes.length - 1) {
          this._length = len;
        }
        return this._helper.formatLength(len);
      });

    text.exit().remove();
  }

  _onOverCircle(d, i, target) {
    if (this._dragging) return;
    select(target).attr('r', 6);
    if (this._options.tooltip) {
      this._tooltip.show(this._projectionUtility.latLngToContainerPoint(d),
        i === 0 ? Config.tooltipText2 : Config.tooltipText1);
    }
  }

  _onOutCircle(d, target) {
    select(target).attr('r', 5);
    this._hideTooltip();
  }

  _onDragCircle() {
    let self = this;
    let isDragged = false;

    let circleDrag = drag()
      .on('drag', function (d, i) {
        isDragged = true;
        self._dragging = true;

        select(this)
          .attr('cx', event.x)
          .attr('cy', event.y);
        self._updateLinePosition.call(self, self._linesBase, i);
        self._updateLinePosition.call(self, self._linesAux, i);
        if (self._options.showSegmentLength) {
          self._updateSegmentTextPosition(i);
        }
        if (self._options.showAccumulativeLength) {
          self._updateNodeTextPosition(i);
        }
        self._updateArea(i, self._projectionUtility.svgPointToLatLng([event.x, event.y]));
      });

    circleDrag.on('start', function(d) {
      event.sourceEvent.stopPropagation();
      select(this).raise().attr('r', 6);
      self._disableMapScroll();
    });

    circleDrag.on('end', function (d, i) {
      self._enableMapScroll();
      if (!isDragged) {
        if (i > 0) {
          self._geometry.removeNode(i);
          select(this).classed('removed-circle', true);
        } else {
          self._geometry.addNode(d);
          self._dragged = true;
        }
      } else {
        self._geometry.updateNode(
          i,
          self._projectionUtility.svgPointToLatLng([event.x, event.y]));
        self._showTooltipOnEvent(i === 0 ? Config.tooltipText2 : Config.tooltipText1);
      }
      isDragged = false;
      self._dragging = false;
      self._overlay.draw();
    });

    return circleDrag;
  }

  _onDragLine() {
    let isDragged = false;
    let lineDrag = drag()
      .on('drag', (d, i) => {
        this._dragging = true;
        if (!isDragged) {
          isDragged = true;
          this._geometry.insertNode(
            i + 1,
            this._projectionUtility.svgPointToLatLng([event.x, event.y]));
          this._updateLine();
          if (this._options.showSegmentLength) {
            this._updateSegmentText();
          }
          if (this._options.showAccumulativeLength) {
            this._updateNodeText();
          }
        }
        this._updateHoverCirclePosition(event.x, event.y);
        this._updateLinePosition(this._linesBase, i + 1);
        this._updateLinePosition(this._linesAux, i + 1);
        if (this._options.showSegmentLength) {
          this._updateSegmentTextPosition(i + 1);
        }
        if (this._options.showAccumulativeLength) {
          this._updateNodeTextPosition(i + 1);
        }
        this._updateArea(i + 1, this._projectionUtility.svgPointToLatLng([event.x, event.y]));
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
        this._showTooltipOnEvent(Config.tooltipText1);
      }
      this._updateArea(i + 1, this._projectionUtility.svgPointToLatLng([event.x, event.y]));
      this._hoverCircle.select("circle")
        .attr('class', "grey-circle");
      this._dragging = false;
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

  _updateSegmentTextPosition(index) {
    if (index < this._geometry.lines.length) {
      this._segmentText.select(`text:nth-child(${index + 1})`)
        .attr('transform', d => {
          let p1 = [event.x, event.y];
          let p2 = this._projectionUtility.latLngToSvgPoint(d[1]);
          return this._doTextTransform(p1, p2);
        })
        .text(d => this._helper.formatLength(this._helper.computeLengthBetween(
          this._projectionUtility.svgPointToLatLng([event.x, event.y]), d[1])));
    }
    if (index > 0) {
      this._segmentText.select(`text:nth-child(${index})`)
        .attr('transform', d => {
          let p1 = this._projectionUtility.latLngToSvgPoint(d[0]);
          let p2 = [event.x, event.y];
          return this._doTextTransform(p1, p2);
        })
        .text(d => this._helper.formatLength(this._helper.computeLengthBetween(
          d[0], this._projectionUtility.svgPointToLatLng([event.x, event.y]))));
    }
  }

  _updateNodeTextPosition(index) {
    this._nodeText.select(`text:nth-child(${index + 1})`)
      .attr('x', event.x)
      .attr('y', () => {
        let offset;
        if (index > 0 && this._projectionUtility.latLngToSvgPoint(
            this._geometry.nodes[index - 1])[1] < event.y) {
          offset = 23;
        } else {
          offset = -7;
        }
        return event.y + offset;
      });
    this._nodeText.select(`text:nth-child(${index + 2})`)
      .attr('y', d => {
        let offset;
        if (index + 1 > 0 && event.y < this._projectionUtility.latLngToSvgPoint(d)[1]) {
          offset = 23;
        } else {
          offset = -7;
        }
        return this._projectionUtility.latLngToSvgPoint(d)[1] + offset;
      });
    let followingNodes = this._nodeText.selectAll('text')
      .filter((d, i) => i >= index);
    followingNodes
      .text((d, i) => {
        let len = this._helper.computePathLength([
          ...this._geometry.nodes.slice(0, index),
          this._projectionUtility.svgPointToLatLng([event.x, event.y]),
          ...this._geometry.nodes.slice(index + 1, index + 1 + i)
        ]);
        if (index + i === this._geometry.nodes.length - 1) {
          this._length = len;
        }
        return this._helper.formatLength(len);
      });
  }

  _doTextTransform(p1, p2) {
      let mid = Helper.findMidPoint([p1, p2]);
      let angle;
      if (p1[0] === p2[0]) {
        if (p2[1] > p1[1]) angle = 90;
        else if (p2[1] < p1[1]) angle = 270;
        else angle = 0;
      } else {
        angle = Math.atan((p2[1] - p1[1]) / (p2[0] - p1[0])) * 180 / Math.PI;
      }
      return `translate(${mid[0]}, ${mid[1]}) rotate(${angle})`;
  }

  _updateHoverCirclePosition(x, y) {
    this._hoverCircle.select("circle")
      .attr('cx', x)
      .attr('cy', y);
    if (this._dragging) return;
    if (this._options.tooltip) {
      this._tooltip.show(this._projectionUtility.svgPointToContainerPoint([x, y]), Config.tooltipText2);
    }
  }

  _hideHoverCircle() {
    this._hoverCircle.select("circle")
      .attr('cx', null)
      .attr('cy', null);
    this._hideTooltip();
  }

  _disableMapScroll() {
    this._map.setOptions({ scrollwheel: false, zoomControl: false });
  }

  _enableMapScroll() {
    this._map.setOptions({ scrollwheel: true, zoomControl: true });
  }

  _transformNodeTextY(d, i) {
    let offset;
      if (i > 0 && this._geometry.nodes[i - 1][1] > d[1]) {
      offset = 23;
    } else {
      offset = -7;
    }
    return this._projectionUtility.latLngToSvgPoint(d)[1] + offset;
  }

  _updateArea(i, pointToCompare) {
    if (!this._geometry) return;
    const n = this._geometry.nodes.length;
    const tolerance = 1 / 80 *  this.length;
    let offset, area = 0;
    if (n > 2) {
      if (i === 0) {
        offset = this._helper.computeLengthBetween(
          this._geometry.nodes[n - 1],
          pointToCompare);
        area = offset > tolerance ? 0 : this._helper.computeArea([
            pointToCompare,
            ...this._geometry.nodes.slice(1, n - 1)
          ]);
      } else if (i === n - 1) {
        offset = this._helper.computeLengthBetween(
          pointToCompare,
          this._geometry.nodes[0]);
        area = offset > tolerance ? 0 : this._helper.computeArea(this._geometry.nodes.slice(0, n - 1));
      } else if (i > 0 && i < n - 1) {
        offset = this._helper.computeLengthBetween(
          this._geometry.nodes[0],
          this._geometry.nodes[n - 1]);
        area = offset > tolerance ? 0 : this._helper.computeArea([
            ...this._geometry.nodes.slice(0, i),
            pointToCompare,
            ...this._geometry.nodes.slice(i + 1)
          ]);
      } else {
        offset = this._helper.computeLengthBetween(
          this._geometry.nodes[0],
          this._geometry.nodes[n - 1]);
        area = offset > tolerance ? 0 : this._helper.computeArea(this._geometry.nodes);
      }
    }
    this._area = area;
    if (area > 0) {
      this._nodeText.select(':last-child')
        .text(`Total distance: ${this.lengthText}; Total area: ${this.areaText}.`);
    }
  }

  _showTooltipOnEvent(text) {
    if (this._options.tooltip) {
      this._tooltip.show(this._projectionUtility.svgPointToContainerPoint([event.x, event.y]), text);
    }
  }

  _hideTooltip() {
    if (this._options.tooltip) {
      this._tooltip.hide();
    }
  }

  _dispatchMeasureEvent() {
    if (!this._started) return;
    if (typeof this._events.get(EVENT_CHANGE) === "function") {
      this._events.get(EVENT_CHANGE)({
        result: {
          length: this.length,
          lengthText: this.lengthText,
          area: this.area,
          areaText: this.areaText
        }
      });
    }
  }
};
