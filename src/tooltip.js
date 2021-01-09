import { Config } from './config';
import css from './tooltip.scss';

export default class Tooltip {
  constructor(div) {
    this._parentDiv = div;
    this._containerDiv = document.createElement('div');
    this._containerDiv.classList.add(`${Config.prefix}-tooltip`);
    this._containerDiv.stylesheet = css;
    div.appendChild(this._containerDiv);
  }

  show(point, text) {
    this._containerDiv.innerHTML = text;
    this._containerDiv.style.cssText = `
      display: block;
      visibility: hidden;
      position: absolute;
    `;
    let w = this._parentDiv.getBoundingClientRect().width;
    let h = this._parentDiv.getBoundingClientRect().height;
    this._containerDiv.style.cssText +=
      point.x < w / 2 ? `left: ${point.x}px;` : `right: ${w - point.x}px;`;
    this._containerDiv.style.cssText +=
      point.y < h / 2 ? `top: ${point.y}px` : `bottom: ${h - point.y}px;`;
    this._containerDiv.style.cssText += 'visibility: visible;';
  }

  hide() {
    this._containerDiv.style.cssText = 'display: none';
  }
}
