import { Config } from './config';
import css from './context-menu.scss';

export default class ContextMenu {
  get left() {
    return this._containerDiv.getBoundingClientRect().left;
  }
  get top() {
    return this._containerDiv.getBoundingClientRect().top;
  }
  get width() {
    return this._containerDiv.getBoundingClientRect().width;
  }
  get height() {
    return this._containerDiv.getBoundingClientRect().height;
  }

  constructor(div, options) {
    this._defaultOptions = {
      width: 150,
    };
    this._options = Object.assign({}, this._defaultOptions, options || {});
    this._parentDiv = div;
    this._containerDiv = document.createElement('div');
    this._containerDiv.classList.add(`${Config.prefix}-context-menu`);
    this._containerDiv.stylesheet = css;
    this._containerDiv.oncontextmenu = (event) => event.preventDefault();
    this._list = document.createElement('ul');
    this._containerDiv.appendChild(this._list);
    div.appendChild(this._containerDiv);
    this._isVisible = false;
  }

  addItem(name, isVisible, cb, context = this) {
    let item = document.createElement('li');
    let content = document.createTextNode(name);

    item.appendChild(content);
    item.onclick = (e) => {
      e.preventDefault();
      cb.apply(context);
      this.hide();
    };
    if (isVisible) {
      this.showItem(item);
    } else {
      this.hideItem(item);
    }
    this._list.appendChild(item);
    return item;
  }

  hideItem(item) {
    item.style.cssText = `display: none`;
  }

  showItem(item) {
    item.style.cssText = `display: block`;
  }

  toggleItems(itemsToShow, itemsToHide) {
    itemsToShow.forEach((item) => this.showItem(item));
    itemsToHide.forEach((item) => this.hideItem(item));
  }

  show(point) {
    this._isVisible = true;
    this._containerDiv.style.cssText = `
      display: block;
      visibility: hidden;
      position: absolute;
      width: ${this._options.width}px; 
    `;
    let isXOverflow =
      this._parentDiv.getBoundingClientRect().width <= point.x + this.width;
    let isYOverflow =
      this._parentDiv.getBoundingClientRect().height <= point.y + this.height;

    this._containerDiv.style.cssText += `
      ${isXOverflow ? 'right: 0px;' : 'left: ' + point.x + 'px;'}
      ${isYOverflow ? 'bottom: 14px;' : 'top: ' + point.y + 'px;'}
      visibility: visible;
    `;
  }

  hide() {
    this._isVisible = false;
    this._containerDiv.style.cssText = `display: none`;
  }

  toggle(point) {
    if (this._isVisible) {
      this.hide();
    } else {
      this.show(point);
    }
  }
}
