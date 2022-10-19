import { toReadableStream } from "#util-stream.mjs";

/**
 * Content entries where a Uint8Array is the primary data representation.
 * @property {Uint8Array} buffer
 *
 */
export function BufferContentEntryMixin(superclass) {
  return class BufferContentEntryMixin extends superclass {
    /**
     * Deliver content as string
     * @return {string} content
     */
    get string() {
      const buffer = this.buffer;

      return buffer.then
        ? buffer.then(buffer => buffer.toString(this.encoding))
        : buffer.toString(this.encoding);
    }

    /**
     * Deliver content as read stream.
     * @return {ReadableStream} content
     */
    get readStream() {
      const buffer = this.buffer;

      return buffer.then
        ? buffer.then(buffer => toReadableStream(buffer))
        : toReadableStream(buffer);
    }

    /**
     * @return {boolean}
     */
    get isEmpty() {
      const buffer = this.buffer;
      return buffer.then
        ? buffer.then(buffer => buffer.length === 0)
        : buffer.length === 0;
    }

    get size()
    {
      const buffer = this.buffer;
      return buffer.then
        ? buffer.then(buffer => buffer.length)
        : buffer.length;
    }

    /**
     * @deprecated
     */
    async getReadStream() {
      return toReadableStream(await this.buffer);
    }
  };
}
