"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDefined;

/**
 * Takes an object and returns a new object that contains only the "defined" values.
 *
 * Values are dropped if they are included in the `drop` array which defaults to `[undefined]`.
 * For example, you may pass `{ drop: [undefined, null] }` to omit null-values as well.
 *
 * In addition to the `drop` check, properties are dropped if their value is an empty object (unless the `{ keepObjects: true }` option is used).
 *
 * @param {Object} target - An object with properties that shall be omitted if empty
 * @param {Object} [options] - Optional settings
 * @param {Array} [options.drop=[undefined]] - Values that should be treated as "non-defined" values
 * @param {Boolean} [options.keepObjects] - Whether to keep values that are an empty object
 * @return {Object} - A new object with only the "defined" values of `target`
 */
function getDefined(target) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$drop = _ref.drop,
      drop = _ref$drop === void 0 ? [undefined] : _ref$drop,
      _ref$keepObjects = _ref.keepObjects,
      keepObjects = _ref$keepObjects === void 0 ? false : _ref$keepObjects;

  if (!target) return undefined;
  var result = Object.keys(target).reduce(function (result, key) {
    var value = target[key];

    if (drop.some(function (t) {
      return value === t;
    })) {
      return result;
    }

    if (Array.isArray(value)) {
      result[key] = value.map(function (v) {
        return getDefined(v, {
          drop: drop,
          keepObjects: keepObjects
        });
      }).filter(function (v) {
        return !drop.some(function (t) {
          return v === t;
        });
      });

      if (result[key].length === 0) {
        delete result[key];
      }
    } else if (Object(value) === value) {
      // non-primitive
      result[key] = getDefined(value, {
        drop: drop,
        keepObjects: keepObjects
      });

      if (keepObjects !== true && Object.keys(result[key]).length === 0) {
        delete result[key];
      }
    } else {
      // primitive
      result[key] = value;
    }

    return result;
  }, {});
  return result;
}