import { drag } from 'd3-drag';
import { select, selectAll } from 'd3-selection';
import { Config } from './config';
import ContextMenu from './context-menu';
import Tooltip from './tooltip';
import ProjectionUtility from './projection-utility';
import { Geometry } from './geometry';
import { Segment } from './segment';
import Helper from './helper';
import { UnitTypeId } from './UnitTypeId';
import { EVENT_START, EVENT_END, EVENT_CHANGE } from './events';
import { ObjectAssign } from './polyfills';
import { deepClone, getClass } from './utils';
import './index.scss';

const nodeTargetRadius = 5;
const nodeTargetExpandRadius = 6;
const touchTargetRadius = 12;

export default class MeasureTool {
  get lengthText() {
    return this._helper.formatLength(this._length || 0);
  }

  get areaText() {
    return this._helper.formatArea(this._area || 0);
  }

  get length() {
    return this._length || 0;
  }

  get area() {
    return this._area || 0;
  }

  get segments() {
    return deepClone(this._segments) || [];
  }

  get points() {
    return (
      deepClone(this._geometry.nodes.map((x) => ({ lat: x[1], lng: x[0] }))) ||
      []
    );
  }

  static get UnitTypeId() {
    return UnitTypeId;
  }

  /**
   * Creates a new measure tool for the google.maps.Map instance.
   * @param map - {google.maps.Map} instance.
   * @param options {MeasureToolOptions}
   */
  constructor(map, options) {
    MeasureTool._initPolyfills();

    this._options = {
      showSegmentLength: true,
      showAccumulativeLength: true,
      contextMenu: true,
      tooltip: true,
      unit: UnitTypeId.METRIC,
      initialSegments: [],
      language: navigator ? navigator.language : 'en',
      invertColor: false,
      ...options,
    };
    this._map = map;
    this._map.setClickableIcons(false);
    this._id = Helper.makeId(4);
    this._events = new Map();
    this._geometry = new Geometry();
    this._init();
  }

  static _initPolyfills() {
    ObjectAssign();
  }

  _init() {
    this._containerDiv = this._map.getDiv().querySelector('div:first-child');

    if (this._options.contextMenu) {
      this._contextMenu = new ContextMenu(this._containerDiv, { width: 160 });
      this._startElementNode = this._contextMenu.addItem(
        'Measure distance',
        true,
        this.start,
        this
      );
      this._endElementNode = this._contextMenu.addItem(
        'Clear measurement',
        false,
        this.end,
        this
      );
      this._bindToggleContextMenu();
    }

    if (this._options.tooltip) {
      this._tooltip = new Tooltip(this._containerDiv);
    }

    this._helper = new Helper({
      unit: this._options.unit,
    });
    this._initOverlay();
  }

  _bindToggleContextMenu() {
    this._map.addListener('contextmenu', (mouseEvent) => {
      this._firstClick = mouseEvent;
      this._contextMenu.show(
        this._projection.fromLatLngToContainerPixel(mouseEvent.latLng)
      );
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.which === 27) {
        this._contextMenu.hide();
      }
    });
    this._containerDiv.addEventListener('mousedown', (event) => {
      if (
        event.clientX >= this._contextMenu.left &&
        event.clientX <= this._contextMenu.left + this._contextMenu.width &&
        event.clientY >= this._contextMenu.top &&
        event.clientY <= this._contextMenu.top + this._contextMenu.height
      ) {
        return;
      }
      this._contextMenu.hide();
    });
  }

  /**
   * start measuring
   * @param {SegmentPoint[]} initialPoints - an array of {SegmentPoint} to initialize the measurement.
   */
  start(initialPoints) {
    if (this._started) return;
    this._overlay.setMap(this._map);
    this._geometry = new Geometry();
    this._segments = [];
    const hasInitialPoints = initialPoints && initialPoints.length > 0;

    if (!this._options.contextMenu && hasInitialPoints) {
      for (let i = 0; i < initialPoints.length; i++) {
        const p = initialPoints[i];
        this._geometry.addNode([p.lng, p.lat]);
        if (i > 0) {
          const p0 = initialPoints[i - 1];
          this._updateSegment([p0, p]);
        }
      }
    }

    if (this._options.contextMenu && this._firstClick) {
      this._checkClick(this._firstClick);
      this._contextMenu.toggleItems(
        [this._endElementNode],
        [this._startElementNode]
      );
    }

    this._mapClickEvent = this._map.addListener('click', (mouseEvent) =>
      this._checkClick(mouseEvent)
    );
    this._map.setOptions({ draggableCursor: 'default' });
    this._started = true;

    if (typeof this._events.get(EVENT_START) === 'function') {
      this._events.get(EVENT_START)();
    }
  }

  /**
   * end measuring
   */
  end() {
    if (!this._started) return;

    if (typeof this._events.get(EVENT_END) === 'function') {
      this._events.get(EVENT_END)(this._getResults());
    }

    if (this._options.contextMenu) {
      this._contextMenu.toggleItems(
        [this._startElementNode],
        [this._endElementNode]
      );
    }
    this._mapClickEvent.remove();
    this._geometry = new Geometry();
    this._onRemoveOverlay();
    this._setOverlay();
    this._overlay.setMap(null);
    this._map.setOptions({ draggableCursor: null });
    this._hideTooltip();

    this._started = false;
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
    if (this._options[option] === undefined) {
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

  _initOverlay() {
    this._setOverlay();
    this._initComplete = false;
  }

  _setOverlay() {
    this._overlay = new google.maps.OverlayView();
    this._overlay.onAdd = this._onAddOverlay.bind(this);
    this._overlay.draw = this._onDrawOverlay.bind(this);
    this._overlay.onRemove = this._onRemoveOverlay.bind(this);
    this._overlay.setMap(this._map);
  }

  _onAddOverlay() {
    if (!this._initComplete) {
      this._initComplete = true;
    }

    this._projection = this._overlay.getProjection();
    this._projectionUtility = new ProjectionUtility(
      this._containerDiv,
      this._projection
    );
    // Add svg to Pane
    this._svgOverlay = select(this._overlay.getPanes().overlayMouseTarget)
      .append('div')
      .attr('class', `${Config.prefix}-measure-points-${this._id}`)
      .append('svg')
      .attr('class', `${Config.prefix}-svg-overlay`);

    this._linesBase = this._svgOverlay.append('g').attr('class', 'base');
    this._linesBase.selectAll('line').data(this._geometry.lines);

    this._linesAux = this._svgOverlay.append('g').attr('class', 'aux');
    this._linesAux.selectAll('line').data(this._geometry.lines);

    this._lineDrag = this._svgOverlay.append('g').attr('class', 'drag');
    this._lineDrag.selectAll('line').data(this._geometry.lines);

    // base node - presentational
    this._nodeCircles = this._svgOverlay
      .append('g')
      .attr('class', 'node-circle');
    this._nodeCircles.selectAll('circle').data(this._geometry.nodes);

    // touch target node
    this._touchCircles = this._svgOverlay
      .append('g')
      .attr('class', 'touch-circle');

    if (this._options.showSegmentLength) {
      this._segmentText = this._svgOverlay
        .append('g')
        .attr('class', 'segment-text');
      this._segmentText.selectAll('text').data(this._geometry.lines);
    }

    if (this._options.showAccumulativeLength) {
      this._nodeText = this._svgOverlay.append('g').attr('class', 'node-text');
      this._nodeText.selectAll('text').data(this._geometry.nodes);
    }

    this._hoverCircle = this._svgOverlay
      .append('g')
      .attr('class', 'hover-circle');
    this._hoverCircle
      .append('circle')
      .attr('class', getClass('grey-circle', this._options.invertColor))
      .attr('r', nodeTargetRadius);

    if (this._initComplete && !this._started) {
      this._overlay.setMap(null);
    }
  }

  /**
   * Update svg stuff here
   * @private
   */
  _onDrawOverlay() {
    this._updateCircles();
    this._updateTouchCircles();
    this._updateLine();
    if (this._options.showSegmentLength) {
      this._updateSegmentText();
    }
    if (this._options.showAccumulativeLength) {
      this._updateNodeText();
    }
    if (this._geometry) {
      this._updateArea(
        this._geometry.nodes.length - 1,
        this._geometry.nodes[this._geometry.nodes.length - 1]
      );
    }
    this._dispatchMeasureEvent();
  }

  _onRemoveOverlay() {
    selectAll(`.${Config.prefix}-measure-points-${this._id}`).remove();
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

  _checkClick(mouseEvent) {
    // Use circle radius 'r' as a flag to determine if it is a delete or add event.
    if (
      !this._dragged &&
      this._touchCircles.selectAll(`circle[r="${nodeTargetExpandRadius}"]`).size() === 0 &&
      !this._hoverCircle.select('circle').attr('cx')
    ) {
      const node = [mouseEvent.latLng.lng(), mouseEvent.latLng.lat()];
      this._geometry.addNode(node);
      this._overlay.draw();
    }
    this._dragged = false;
  }

  _updateCircles() {
    let self = this;
    // join with old data
    let circles = this._nodeCircles
      .selectAll('circle')
      .data(this._geometry.nodes)
      .join('circle')
      .datum((d, i) => [d, i])
      .attr('class', ([, i]) =>
        i === 0
          ? `${getClass('cover-circle', this._options.invertColor)} head-circle`
          : getClass('cover-circle', this._options.invertColor)
      )
      .attr('r', nodeTargetRadius)
      .attr('cx', ([d]) => this._projectionUtility.latLngToSvgPoint(d)[0])
      .attr('cy', ([d]) => this._projectionUtility.latLngToSvgPoint(d)[1])
      .on('mouseover', function (event, [d, i]) {
        self._onOverCircle(d, i, this);
      })
      .on('mouseout', function (event, [d, i]) {
        self._onOutCircle(d, i, this);
      })
      .on('mousedown', () => this._hideTooltip());

    // enter and seat the new data with same style.
    circles
      .enter()
      .append('circle')
      .attr('class', getClass('cover-circle', this._options.invertColor))
      .attr('r', nodeTargetRadius)
      .attr('cx', ([d]) => this._projectionUtility.latLngToSvgPoint(d)[0])
      .attr('cy', ([d]) => this._projectionUtility.latLngToSvgPoint(d)[1])
      .on('mouseover', function (event, [d, i]) {
        self._onOverCircle(d, i, this);
      })
      .on('mouseout', function (event, [d, i]) {
        self._onOutCircle(d, i, this);
      })
      .on('mousedown', () => this._hideTooltip());

    this._nodeCircles.selectAll('.removed-circle').remove();
  }

  _updateTouchCircles() {
    let self = this;
    // join with old data
    let circles = this._touchCircles
      .selectAll('circle')
      .data(this._geometry.nodes)
      .join('circle')
      .datum((d, i) => [d, i])
      .attr('class', ([, i]) =>
        i === 0
          ? `${getClass('touch-circle', this._options.invertColor)} head-circle`
          : getClass('touch-circle', this._options.invertColor)
      )
      .attr('r', touchTargetRadius)
      .attr('cx', ([d]) => this._projectionUtility.latLngToSvgPoint(d)[0])
      .attr('cy', ([d]) => this._projectionUtility.latLngToSvgPoint(d)[1])
      .on('mouseover', function (event, [d, i]) {
        self._onOverCircle(d, i, this);
      })
      .on('mouseout', function (event, [d, i]) {
        self._onOutCircle(d, i, this);
      })
      .on('touchstart', function (event, [d, i]) {
        event.preventDefault();
        self._onOverCircle(d, i, this, true);
      })
      .on('touchend', function (event, [d, i]) {
        event.preventDefault();
        self._onOutCircle(d, i, this);
      })
      .on('mousedown', () => this._hideTooltip())
      .call(this._onDragCircle());

    // enter and seat the new data with same style.
    circles
      .enter()
      .append('circle')
      .attr('class', getClass('touch-circle', this._options.invertColor))
      .attr('r', touchTargetRadius)
      .attr('cx', ([d]) => this._projectionUtility.latLngToSvgPoint(d)[0])
      .attr('cy', ([d]) => this._projectionUtility.latLngToSvgPoint(d)[1])
      .on('mouseover', function (event, [d, i]) {
        self._onOverCircle(d, i, this);
      })
      .on('mouseout', function (event, [d, i]) {
        self._onOutCircle(d, i, this);
      })
      .on('touchstart', function (event, [d, i]) {
        event.preventDefault();
        self._onOverCircle(d, i, this, true);
      })
      .on('touchend', function (event, [d, i]) {
        event.preventDefault();
        self._onOutCircle(d, i, this);
      })
      .on('mousedown', () => this._hideTooltip())
      .call(this._onDragCircle());

    this._touchCircles.selectAll('.removed-circle').remove();
  }

  _updateLine() {
    this._segments = [];

    let linesBase = this._linesBase
      .selectAll('line')
      .data(this._geometry.lines)
      .attr('class', getClass('base-line', this._options.invertColor))
      .attr('x1', (d) => this._projectionUtility.latLngToSvgPoint(d[0])[0])
      .attr('y1', (d) => this._projectionUtility.latLngToSvgPoint(d[0])[1])
      .attr('x2', (d) => this._projectionUtility.latLngToSvgPoint(d[1])[0])
      .attr('y2', (d) => this._projectionUtility.latLngToSvgPoint(d[1])[1])
      .each((d) => this._updateSegment(d));

    linesBase.exit().remove();
    linesBase
      .enter()
      .append('line')
      .attr('class', getClass('base-line', this._options.invertColor))
      .attr('x1', (d) => this._projectionUtility.latLngToSvgPoint(d[0])[0])
      .attr('y1', (d) => this._projectionUtility.latLngToSvgPoint(d[0])[1])
      .attr('x2', (d) => this._projectionUtility.latLngToSvgPoint(d[1])[0])
      .attr('y2', (d) => this._projectionUtility.latLngToSvgPoint(d[1])[1])
      .each((d) => this._updateSegment(d));

    let linesAux = this._linesAux
      .selectAll('line')
      .data(this._geometry.lines)
      .join('line')
      .datum((d, i) => [d, i])
      .attr('class', 'aux-line')
      .attr('x1', ([d]) => this._projectionUtility.latLngToSvgPoint(d[0])[0])
      .attr('y1', ([d]) => this._projectionUtility.latLngToSvgPoint(d[0])[1])
      .attr('x2', ([d]) => this._projectionUtility.latLngToSvgPoint(d[1])[0])
      .attr('y2', ([d]) => this._projectionUtility.latLngToSvgPoint(d[1])[1]);

    linesAux
      .on('mousemove', (event, [d]) => {
        let point = Helper.findTouchPoint(
          [
            this._projectionUtility.latLngToSvgPoint(d[0]),
            this._projectionUtility.latLngToSvgPoint(d[1]),
          ],
          [event.offsetX, event.offsetY]
        );
        this._updateHoverCirclePosition(point[0], point[1]);
      })
      .on('mouseout', () => this._hideHoverCircle())
      .on('mousedown', () => this._hideTooltip())
      .on('touchstart', e => {
        // prevent simulated mouse events
        e.preventDefault();
      })
      .call(this._onDragLine(linesAux, linesBase));

    linesAux.exit().remove();
    linesAux
      .enter()
      .append('line')
      .join('line')
      .datum((d, i) => [d, i])
      .attr('class', 'aux-line')
      .attr('x1', ([d]) => this._projectionUtility.latLngToSvgPoint(d[0])[0])
      .attr('y1', ([d]) => this._projectionUtility.latLngToSvgPoint(d[0])[1])
      .attr('x2', ([d]) => this._projectionUtility.latLngToSvgPoint(d[1])[0])
      .attr('y2', ([d]) => this._projectionUtility.latLngToSvgPoint(d[1])[1]);

    const lineDrag = this._lineDrag.selectAll('line').data([]);

    lineDrag.exit().remove();
  }

  _updateSegmentText() {
    let text = this._segmentText
      .selectAll('text')
      .data(this._geometry.lines)
      .attr(
        'class',
        getClass('segment-measure-text', this._options.invertColor)
      )
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'text-before-edge')
      .attr('transform', (d) => {
        let p1 = this._projectionUtility.latLngToSvgPoint(d[0]);
        let p2 = this._projectionUtility.latLngToSvgPoint(d[1]);
        return Helper.transformText(p1, p2);
      })
      .text((d, i) =>
        this._helper.formatLength(this._helper.computeLengthBetween(d[0], d[1]))
      );

    text
      .enter()
      .append('text')
      .attr(
        'class',
        getClass('segment-measure-text', this._options.invertColor)
      )
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'text-before-edge')
      .attr('transform', (d) => {
        let p1 = this._projectionUtility.latLngToSvgPoint(d[0]);
        let p2 = this._projectionUtility.latLngToSvgPoint(d[1]);
        return Helper.transformText(p1, p2);
      })
      .text((d, i) =>
        this._helper.formatLength(this._helper.computeLengthBetween(d[0], d[1]))
      );

    text.exit().remove();
  }

  _updateNodeText() {
    let text = this._nodeText
      .selectAll('text')
      .data(this._geometry.nodes)
      .attr('class', (d, i) =>
        i === 0
          ? `${getClass(
              'node-measure-text',
              this._options.invertColor
            )} head-text`
          : getClass('node-measure-text', this._options.invertColor)
      )
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'text-after-edge')
      .attr('x', (d) => this._projectionUtility.latLngToSvgPoint(d)[0])
      .attr('y', this._transformNodeTextY.bind(this))
      .text((d, i) => {
        let len = this._helper.computePathLength(
          this._geometry.nodes.slice(0, i + 1)
        );
        if (i === this._geometry.nodes.length - 1) {
          this._length = len;
        }
        return this._helper.formatLength(len);
      });

    text
      .enter()
      .append('text')
      .attr('class', (d, i) =>
        i === 0
          ? `${getClass(
              'node-measure-text',
              this._options.invertColor
            )} head-text`
          : getClass('node-measure-text', this._options.invertColor)
      )
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'text-after-edge')
      .attr('x', (d) => this._projectionUtility.latLngToSvgPoint(d)[0])
      .attr('y', this._transformNodeTextY.bind(this))
      .text((d, i) => {
        let len = this._helper.computePathLength(
          this._geometry.nodes.slice(0, i + 1)
        );
        if (i === this._geometry.nodes.length - 1) {
          this._length = len;
        }
        return this._helper.formatLength(len);
      });

    text.exit().remove();
  }

  _onOverCircle(d, i, target, isTouch = false) {
    if (this._dragging) return;
    let selection = select(target);
    if (!selection.classed('base')) {
      selection = this._nodeCircles.select(`circle:nth-child(${i + 1})`);
    }
    selection.attr('r', nodeTargetExpandRadius);

    if (this._options.tooltip && !isTouch) {
      this._tooltip.show(
        this._projectionUtility.latLngToContainerPoint(d),
        i === 0
          ? Config.tooltipText2(this._options.language)
          : Config.tooltipText1(this._options.language)
      );
    }
  }

  _onOutCircle(d, i, target) {
    let selection = select(target);
    if (!selection.classed('base')) {
      selection = this._nodeCircles.select(`circle:nth-child(${i + 1})`);
    }
    selection.attr('r', nodeTargetRadius);
    this._hideTooltip();
  }

  _onDragCircle() {
    let self = this;
    let isDragged = false;

    let circleDrag = drag().on('drag', function (event, [, i]) {
      isDragged = true;
      self._dragging = true;

      select(this).attr('cx', event.x).attr('cy', event.y);
      self._updateLinePosition.call(self, self._linesBase, i, event);
      self._updateLinePosition.call(self, self._linesAux, i, event);
      self._updateNodeCirclePosition(i, event);
      if (self._options.showSegmentLength) {
        self._updateSegmentTextPosition(i, event);
      }
      if (self._options.showAccumulativeLength) {
        self._updateNodeTextPosition(i, event);
      }
      self._updateArea(
        i,
        self._projectionUtility.svgPointToLatLng([event.x, event.y])
      );
    });

    circleDrag.on('start', function (event) {
      event.sourceEvent.stopPropagation();
      select(this).raise().attr('r', nodeTargetExpandRadius);
      self._disableMapScroll();
    });

    circleDrag.on('end', function (event, [d, i]) {
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
          self._projectionUtility.svgPointToLatLng([event.x, event.y])
        );
        self._showTooltipOnEvent(
          i === 0
            ? Config.tooltipText2(self._options.language)
            : Config.tooltipText1(self._options.language),
          event
        );
      }
      isDragged = false;
      self._dragging = false;
      self._overlay.draw();
    });

    return circleDrag;
  }

  _onDragLine() {
    let isDragged = false;
    let lineDrag = drag().on('drag', (event, [, i]) => {
      this._dragging = true;
      if (!isDragged) {
        isDragged = true;

        // idea - The problems seems that we can't rejoin the data on the same selection during the drag,
        // but we can use the new data to create a new line just to show during the drag by passing the drag event to it.
        this._geometry.insertNode(
          i + 1,
          this._projectionUtility.svgPointToLatLng([event.x, event.y])
        );

        const lineDrag = this._lineDrag
          .selectAll('line')
          .data(this._geometry.lines);

        lineDrag.exit().remove();
        lineDrag
          .enter()
          .append('line')
          .attr('class', getClass('base-line', this._options.invertColor))
          .attr('x1', (d) => this._projectionUtility.latLngToSvgPoint(d[0])[0])
          .attr('y1', (d) => this._projectionUtility.latLngToSvgPoint(d[0])[1])
          .attr('x2', (d) => this._projectionUtility.latLngToSvgPoint(d[1])[0])
          .attr('y2', (d) => this._projectionUtility.latLngToSvgPoint(d[1])[1]);

        this._linesBase.selectAll('line').style('display', 'none');
        this._linesAux.selectAll('line').style('display', 'none');

        if (this._options.showSegmentLength) {
          this._updateSegmentText();
        }
        if (this._options.showAccumulativeLength) {
          this._updateNodeText();
        }
      }
      this._updateHoverCirclePosition(event.x, event.y);
      this._updateLinePosition(this._lineDrag, i + 1, event);
      if (this._options.showSegmentLength) {
        this._updateSegmentTextPosition(i + 1, event);
      }
      if (this._options.showAccumulativeLength) {
        this._updateNodeTextPosition(i + 1, event);
      }
      this._updateArea(
        i + 1,
        this._projectionUtility.svgPointToLatLng([event.x, event.y])
      );
    });

    lineDrag.on('start', (event) => {
      event.sourceEvent.stopPropagation();
      this._hoverCircle
        .select('circle')
        .attr('class', getClass('cover-circle', this._options.invertColor));
      this._disableMapScroll();
    });

    lineDrag.on('end', (event, [, i]) => {
      this._enableMapScroll();
      if (isDragged) {
        this._geometry.updateNode(
          i + 1,
          this._projectionUtility.svgPointToLatLng([event.x, event.y])
        );
        this._hideHoverCircle();
        this._overlay.draw();
        isDragged = false;
        this._showTooltipOnEvent(
          Config.tooltipText1(this._options.language),
          event
        );
      }
      this._updateArea(
        i + 1,
        this._projectionUtility.svgPointToLatLng([event.x, event.y])
      );
      this._hoverCircle
        .select('circle')
        .attr('class', getClass('grey-circle', this._options.invertColor));
      this._linesBase.selectAll('line').style('display', 'inline');
      this._linesAux.selectAll('line').style('display', 'inline');
      this._dragging = false;
    });

    return lineDrag;
  }

  _updateLinePosition(group, i, event) {
    if (i < this._geometry.lines.length) {
      group
        .select(`line:nth-child(${i + 1})`)
        .attr('x1', event.x)
        .attr('y1', event.y);
    }
    if (i > 0) {
      group
        .select(`line:nth-child(${i})`)
        .attr('x2', event.x)
        .attr('y2', event.y);
    }
  }

  _updateSegmentTextPosition(index, event) {
    if (index < this._geometry.lines.length) {
      this._segmentText
        .select(`text:nth-child(${index + 1})`)
        .attr('transform', (d) => {
          let p1 = [event.x, event.y];
          let p2 = this._projectionUtility.latLngToSvgPoint(d[1]);
          return Helper.transformText(p1, p2);
        })
        .text((d) =>
          this._helper.formatLength(
            this._helper.computeLengthBetween(
              this._projectionUtility.svgPointToLatLng([event.x, event.y]),
              d[1]
            )
          )
        );
    }
    if (index > 0) {
      this._segmentText
        .select(`text:nth-child(${index})`)
        .attr('transform', (d) => {
          let p1 = this._projectionUtility.latLngToSvgPoint(d[0]);
          let p2 = [event.x, event.y];
          return Helper.transformText(p1, p2);
        })
        .text((d) =>
          this._helper.formatLength(
            this._helper.computeLengthBetween(
              d[0],
              this._projectionUtility.svgPointToLatLng([event.x, event.y])
            )
          )
        );
    }
  }

  _updateNodeTextPosition(index, event) {
    this._nodeText
      .select(`text:nth-child(${index + 1})`)
      .attr('x', event.x)
      .attr('y', () => {
        let offset;
        if (
          index > 0 &&
          this._projectionUtility.latLngToSvgPoint(
            this._geometry.nodes[index - 1]
          )[1] < event.y
        ) {
          offset = 23;
        } else {
          offset = -7;
        }
        return event.y + offset;
      });
    this._nodeText.select(`text:nth-child(${index + 2})`).attr('y', (d) => {
      let offset;
      if (
        index + 1 > 0 &&
        event.y < this._projectionUtility.latLngToSvgPoint(d)[1]
      ) {
        offset = 23;
      } else {
        offset = -7;
      }
      return this._projectionUtility.latLngToSvgPoint(d)[1] + offset;
    });
    let followingNodes = this._nodeText
      .selectAll('text')
      .filter((d, i) => i >= index);
    followingNodes.text((d, i) => {
      let len = this._helper.computePathLength([
        ...this._geometry.nodes.slice(0, index),
        this._projectionUtility.svgPointToLatLng([event.x, event.y]),
        ...this._geometry.nodes.slice(index + 1, index + 1 + i),
      ]);
      if (index + i === this._geometry.nodes.length - 1) {
        this._length = len;
      }
      return this._helper.formatLength(len);
    });
  }

  _updateNodeCirclePosition(index, event) {
    this._nodeCircles.select(`circle:nth-child(${index + 1})`)
      .attr('cx', event.x)
      .attr('cy', event.y);
  }

  _updateHoverCirclePosition(x, y) {
    this._hoverCircle.select('circle').attr('cx', x).attr('cy', y);
    if (this._dragging) return;
    if (this._options.tooltip) {
      this._tooltip.show(
        this._projectionUtility.svgPointToContainerPoint([x, y]),
        Config.tooltipText2(this._options.language)
      );
    }
  }

  _hideHoverCircle() {
    this._hoverCircle.select('circle').attr('cx', null).attr('cy', null);
    this._hideTooltip();
  }

  _disableMapScroll() {
    this._zoomControl = !!document.querySelector(
      "button[aria-label='Zoom in']"
    );
    this._map.setOptions({
      scrollwheel: false,
      gestureHandling: 'none',
      zoomControl: false,
    });
  }

  _enableMapScroll() {
    this._map.setOptions({
      scrollwheel: true,
      gestureHandling: 'auto',
      zoomControl: this._zoomControl,
    });
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
    const tolerance = (1 / 80) * this.length;
    let offset,
      area = 0;
    if (n > 2) {
      if (i === 0) {
        offset = this._helper.computeLengthBetween(
          this._geometry.nodes[n - 1],
          pointToCompare
        );
        area =
          offset > tolerance
            ? 0
            : this._helper.computeArea([
                pointToCompare,
                ...this._geometry.nodes.slice(1, n - 1),
              ]);
      } else if (i === n - 1) {
        offset = this._helper.computeLengthBetween(
          pointToCompare,
          this._geometry.nodes[0]
        );
        area =
          offset > tolerance
            ? 0
            : this._helper.computeArea(this._geometry.nodes.slice(0, n - 1));
      } else if (i > 0 && i < n - 1) {
        offset = this._helper.computeLengthBetween(
          this._geometry.nodes[0],
          this._geometry.nodes[n - 1]
        );
        area =
          offset > tolerance
            ? 0
            : this._helper.computeArea([
                ...this._geometry.nodes.slice(0, i),
                pointToCompare,
                ...this._geometry.nodes.slice(i + 1),
              ]);
      } else {
        offset = this._helper.computeLengthBetween(
          this._geometry.nodes[0],
          this._geometry.nodes[n - 1]
        );
        area =
          offset > tolerance
            ? 0
            : this._helper.computeArea(this._geometry.nodes);
      }
    }
    this._area = area;
    if (area > 0) {
      this._nodeText
        .select(':last-child')
        .text(
          `Total distance: ${this.lengthText}; Total area: ${this.areaText}.`
        );
    }
  }

  _showTooltipOnEvent(text, event) {
    // don't show tooltip in a touch event
    if (event.sourceEvent.type.startsWith('touch')) {
      return;
    }
    if (this._options.tooltip) {
      this._tooltip.show(
        this._projectionUtility.svgPointToContainerPoint([event.x, event.y]),
        text
      );
    }
  }

  _hideTooltip() {
    if (this._options.tooltip) {
      this._tooltip.hide();
    }
  }

  _dispatchMeasureEvent() {
    if (!this._started) return;
    const result = this._getResults();

    if (
      this._lastMeasure &&
      this._lastMeasure.result.lengthText === this.lengthText &&
      this._lastMeasure.result.areaText === this.areaText
    )
      return;
    if (typeof this._events.get(EVENT_CHANGE) === 'function') {
      this._events.get(EVENT_CHANGE)((this._lastMeasure = result));
    }
  }

  _updateSegment(d) {
    const len = this._helper.computeLengthBetween(d[0], d[1]);
    const lenTxt = this._helper.formatLength(len);
    this._segments.push(new Segment(d[0], d[1], len, lenTxt).toJSON());
  }

  _getResults() {
    return {
      result: {
        length: this.length,
        lengthText: this.lengthText,
        area: this.area,
        areaText: this.areaText,
        segments: this.segments,
        points: this.points,
      },
    };
  }
}
