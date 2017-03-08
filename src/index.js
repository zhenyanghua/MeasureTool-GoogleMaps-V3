// import css from 'style.scss';
import ContextMenu from './context-menu';

export default class MeasureTool {
  constructor(map) {
    this._map = map;
    this._map.setClickableIcons(false);
    this._init();
  }

  _init() {
    this._contextMenu = new ContextMenu(this._map.getDiv(), { width: 160 });
    this._startNode = this._contextMenu.addItem("Measure distance", true, this._startMeasure, this);
    this._endNode = this._contextMenu.addItem("Clear measurement", false, this._endMeasure, this);

    this._overlay = new google.maps.OverlayView();
    this._overlay.onAdd = () => {
      this._projection = this._overlay.getProjection();
    };
    this._overlay.draw = () => {};
    this._overlay.setMap(this._map);
    this._bindToggleContextMenu();
  }

  _bindToggleContextMenu() {
    this._map.addListener('rightclick', mouseEvent => {
      this._firstPoint = mouseEvent.latLng;
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
    console.log("start measure", this._firstPoint);
    this._contextMenu.toggleItems([this._endNode], [this._startNode]);
  }

  _endMeasure() {
    console.log("end measure");
    this._contextMenu.toggleItems([this._startNode], [this._endNode]);
  }
};
