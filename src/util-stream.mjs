// @ts-check
import { Readable } from "node:stream";

class EmptyReadable extends Readable {
  _read() {
    this.push(null);
  }
}

let _emptyReadable;

export function emptyReadable() {
  if (!_emptyReadable) {
    _emptyReadable = new EmptyReadable();
  }

  return _emptyReadable;
}

/**
 *
 * @param {string} input
 * @returns {Readable}
 */
export const toReadableStream = input =>
  new Readable({
    read() {
      this.push(input);
      this.push(null);
    }
  });
