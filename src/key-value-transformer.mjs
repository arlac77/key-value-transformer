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
 * @property {Function} extractKeyValue 1st. line with key and value
 * @property {Function} extractValueContinuation additional lines holding only values
 * @property {string} lineEnding used to separate lines
 * @property {Function} keyValueLines to generate one lines for a key value(s) pair
 * @property {Iterator<string>} trailingLines lines coming after all key values have been written
 */

/**
 * @type KeyValueTransformOptions
 * Options to describe key value pair separated by a colon ':'
 */
export const colonSeparatedKeyValuePairOptions = {
  extractKeyValue: line => {
    const m = line.match(/^(\w+):\s*(.*)/);
    if (m) {
      return [m[1], m[2]];
    }
  },
  extractValueContinuation: (line, key, value) => {
    const m = line.match(/^\s+(.*)/);
    if (m) {
      return value + m[1];
    }
  },
  keyValueLines: keyValueLines1,
  lineEnding: "\n"
};

function * keyValueLines1 (key,value,lineEnding) {
  yield `${key}: ${Array.isArray(value) ? value.join(",") : value}${lineEnding}`; 
}

/**
 * @type KeyValueTransformOptions
 * Options to describe key value pair separated by an equal sign '='
 */
export const equalSeparatedKeyValuePairOptions = {
  ...colonSeparatedKeyValuePairOptions,
  extractKeyValue: line => {
    const m = line.match(/^(\w+)=\s*(.*)/);
    if (m) {
      return [m[1], m[2]];
    }
  },
  keyValueLines: keyValueLines2
};

function * keyValueLines2 (key,value,lineEnding) {
  yield `${key}=${Array.isArray(value) ? value.join(",") : value}${lineEnding}`; 
}

/**
 * @type KeyValueTransformOptions
 * Options to describe key value pair separated by a colon ':'
 */
 export const colonSeparatedKeyValuePairOptionsDoublingKeys = {
  ...colonSeparatedKeyValuePairOptions,
  keyValueLines: keyValueLines3
};

function * keyValueLines3 (key,value,lineEnding) {
  if(Array.isArray(value)) {
    for(const v of value) {
      yield `${key}: ${v}${lineEnding}`; 
    }
  }
  else {
    yield `${key}: ${value}${lineEnding}`; 
  }
}

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
  const {
    extractKeyValue,
    extractValueContinuation,
    lineEnding,
    keyValueLines,
    trailingLines
  } = options;

  const presentKeys = new Set();

  let key, value;

  function* writeOutstandingKeyValues() {
    if (key !== undefined) {
      for (const [k, v] of updates(key, value, presentKeys)) {
        yield *keyValueLines(k, v, lineEnding);
      }
      key = value = undefined;
    }
  }

  for await (const line of asLines(source)) {
    const kv = extractKeyValue(line);
    if (kv !== undefined) {
      yield* writeOutstandingKeyValues();
      [key, value] = kv;
      presentKeys.add(key);
    } else if (key !== undefined) {
      const v = extractValueContinuation(line, key, value);
      if (v !== undefined) {
        value = v;
      } else {
        yield* writeOutstandingKeyValues();
        yield line + lineEnding;
      }
    } else {
      yield line + lineEnding;
    }
  }

  yield* writeOutstandingKeyValues();

  for (const [k, v] of updates(undefined, undefined, presentKeys)) {
    yield *keyValueLines(k, v, lineEnding);
  }

  if (trailingLines) {
    yield* trailingLines();
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
