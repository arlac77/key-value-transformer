
export function concatUint8Arrays(...bufs) {
  const result = new Uint8Array(
    bufs.reduce((totalSize, buf) => totalSize + buf.byteLength, 0)
  );
  bufs.reduce((offset, buf) => {
    result.set(buf, offset);
    return offset + buf.byteLength;
  }, 0);
  return result;
}

/**
 * Returns true if the two passed Uint8Arrays have the same content
 *
 * @param {Uint8Array} a
 * @param {Uint8Array} b
 * @return {boolean} true if content of a equals b
 */
 export function equalsUint8Arrays(a, b) {
  if (a === b) {
    return true
  }

  if (a.byteLength !== b.byteLength) {
    return false
  }

  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }

  return true
}
