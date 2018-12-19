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
export default function getDefined(target, { drop = [undefined], keepObjects = false } = {}) {
    if (!target) return undefined;
    const result = Object.keys(target).reduce((result, key) => {
        const value = target[key];
        if (drop.some(t => value === t)) {
            return result;
        }
        if (Array.isArray(value)) {
            result[key] = value.map(v => getDefined(v, { drop, keepObjects })).filter(v => !drop.some(t => v === t));
            if (result[key].length === 0) {
                delete result[key];
            }
        } else if (Object(value) === value) {
            // non-primitive
            result[key] = getDefined(value, { drop, keepObjects });
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
