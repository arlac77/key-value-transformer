// @ts-check
import { Readable } from "#stream.mjs";
import { toReadableStream } from "#util-stream.mjs";

/**
 * Content entries where a string is the primary data representation.
 * @property {string} string
 */
export function StringContentEntryMixin(superclass) {
  return class StringContentEntryMixin extends superclass {
    /**
     * @return {Uint8Array}
     */
    get buffer() {
      const encoder = new TextEncoder(/*this.encoding*/);
      return encoder.encode(this.string);
    }

    /**
     * @return {Number} size in bytes
     */
    get size() {
      return this.buffer.length;
    }

    /**
     * Deliver content as read stream
     * @return {Readable} content
     */
    get readStream() {
      return toReadableStream(this.string);
    }

    /**
     * @deprecated
     */
    async getReadStream() {
      return toReadableStream(this.string);
    }
  };
}
