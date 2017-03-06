export default class Helper {
  static debounce(cb, deley, context = this) {
    let timeout = null;
    let cbArgs = null;
    const later = () => cb.apply(context, cbArgs);

    return function () {
      cbArgs = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(later, deley);
    }
  }
}