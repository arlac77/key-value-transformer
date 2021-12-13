/**
 * @typedef {Function} KeyValueUpdates
 *
 * The last call to KeyValueUpdates will be with an undefined key to provide required 'default' key value pairs.
 *
 * @param {string} key current key
 * @param {string} value current value
 * @param {Set<string>} presentKeys the already seen keys
 * @return {AsyncIterator<string[]>} updated key and value pairs
 */

/**
 * @typedef {Objects} KeyValueTransformOptions
 * @property {RegExp} keyValueRegex
 * @property {RegExp} additionalValueRegex
 * @property {string} lineEnding
 * @property {Function} keyValueLine to generate one line
 */

/**
 * @type KeyValueTransformOptions
 * Options to describe key value pair separated by a colon ':'
 */
export const colonSeparatedKeyValuePairOptions = {
  keyValueRegex: /^(\w+):\s*(.*)/,
  additionalValueRegex: /^\s+(.*)/,
  lineEnding: "\n",
  keyValueLine: (key, value, lineEnding) =>
    `${key}: ${Array.isArray(value) ? value.join(",") : value}${lineEnding}`
};

/**
 * @type KeyValueTransformOptions
 * Options to describe key value pair separated by an equal sign '='
 */
export const equalSeparatedKeyValuePairOptions = {
  ...colonSeparatedKeyValuePairOptions,
  keyValueRegex: /^(\w+)=\s*(.*)/,
  keyValueLine: (key, value, lineEnding) =>
    `${key}=${Array.isArray(value) ? value.join(",") : value}${lineEnding}`
};

/**
 * Replaces key value pairs in a stream of lines.
 * @param {AsyncIterator<string>} source
 * @param {KeyValueUpdates} updates
 * @param {KeyValueTransformOptions} options
 * @return {AsyncIterator<string>} lines with replaces key value pairs
 */
export async function* keyValueTransformer(
  source,
  updates,
  options = colonSeparatedKeyValuePairOptions
) {
  const { keyValueRegex, additionalValueRegex, lineEnding, keyValueLine } =
    options;

  const presentKeys = new Set();

  let key, value;

  function* eject() {
    if (key !== undefined) {
      for (const [k, v] of updates(key, value, presentKeys)) {
        yield keyValueLine(k, v, lineEnding);
      }
      key = value = undefined;
    }
  }

  for await (const line of asLines(source)) {
    const m = line.match(keyValueRegex);
    if (m) {
      yield* eject();
      key = m[1];
      value = m[2];
      presentKeys.add(key);
    } else if (key !== undefined) {
      const m = line.match(additionalValueRegex);
      if (m) {
        value += m[1];
      } else {
        yield* eject();
        yield line + lineEnding;
      }
    } else {
      yield line + lineEnding;
    }
  }

  yield* eject();

  for (const [k, v] of updates(undefined, undefined, presentKeys)) {
    yield keyValueLine(k, v, lineEnding);
  }
}

async function* asLines(source) {
  let buffer = "";

  for await (let chunk of source) {
    buffer += chunk.toString();
    const lines = buffer.split(/\n\r?/);
    buffer = lines.pop();
    for (const line of lines) {
      yield line;
    }
  }

  if (buffer.length > 0) {
    yield buffer;
  }
}
