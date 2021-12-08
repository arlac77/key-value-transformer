

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
 * Replaces key value pairs in a stream of lines.
 * @param {AsyncIterator<string>} source
 * @param {KeyValueUpdates} updates
 * @return {AsyncIterator<string>} lines with replaces key value pairs
 */
export async function* keyValueTransformer(source, updates) {
  const keyValueRegex = /^(\w+):\s*(.*)/;
  const additionalValueRegex = /^\s+(.*)/;
  const lineEnding = "\n";

  const presentKeys = new Set();

  let key, value;

  function* eject() {
    if (key !== undefined) {
      for (const [k, v] of updates(key, value, presentKeys)) {
        yield `${k}: ${v}${lineEnding}`;
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
    yield `${k}: ${v}${lineEnding}`;
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
