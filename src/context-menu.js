export default class ContextMenu {

  get left() { return this._containerDiv.getBoundingClientRect().left; }
  get top() { return this._containerDiv.getBoundingClientRect().top; }
  get width() { return this._containerDiv.getBoundingClientRect().width; }
  get height() { return this._containerDiv.getBoundingClientRect().height; }

  constructor(div) {
    this._containerDiv = document.createElement("div");
    this._containerDiv.oncontextmenu = event => event.preventDefault();
    this._list = document.createElement("ul");
    this._containerDiv.appendChild(this._list);
    div.appendChild(this._containerDiv);
    this._isVisible = false;
  }

  addItem(name, isVisible, cb, context = this) {
    let item = document.createElement("li");
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
    itemsToShow.forEach(item => this.showItem(item));
    itemsToHide.forEach(item => this.hideItem(item));
  }

  show(point) {
    this._isVisible = true;
    this._containerDiv.style.cssText = `
      display: block;
      position: absolute; 
      top: ${point.y}px; 
      left: ${point.x}px;
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
};
