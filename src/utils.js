/**
 * Deep Clone Implementation
 * https://stackoverflow.com/a/4460624/2161568
 * @param item
 * @return {*}
 */
export const deepClone = (item) => {
  if (!item) {
    return item;
  } // null, undefined values check

  let types = [Number, String, Boolean],
    result;

  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach(function (type) {
    if (item instanceof type) {
      result = type(item);
    }
  });

  if (typeof result === 'undefined') {
    if (Object.prototype.toString.call(item) === '[object Array]') {
      result = [];
      item.forEach(function (child, index, array) {
        result[index] = deepClone(child);
      });
    } else if (typeof item === 'object') {
      // testing that this is DOM
      if (item.nodeType && typeof item.cloneNode === 'function') {
        result = item.cloneNode(true);
      } else if (!item.prototype) {
        // check that this is a literal
        if (item instanceof Date) {
          result = new Date(item);
        } else {
          // it is an object literal
          result = {};
          for (let i in item) {
            result[i] = deepClone(item[i]);
          }
        }
      } else {
        // depending what you would like here,
        // just keep the reference, or create new object
        if (false && item.constructor) {
          // would not advice to do that, reason? Read below
          result = new item.constructor();
        } else {
          result = item;
        }
      }
    } else {
      result = item;
    }
  }

  return result;
};

export const detectFeature = () => {
  // Test via a getter in the options object to see if the passive property is accessed
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true;
      },
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (e) {}

  return supportsPassive;
};

export const getClass = (name, inverted = false) => {
  return inverted ? `${name} inverted` : name;
};
