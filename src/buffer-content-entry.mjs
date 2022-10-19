// @ts-check
import { BufferContentEntryMixin } from "./buffer-content-entry-mixin.mjs";
import { ContentEntry } from "./content-entry.mjs";

/**
 * ConentEntry with a Uint8Array as content store.
 * @param {string} name
 * @param {Uint8Array} buffer
 */
export class BufferContentEntry extends BufferContentEntryMixin(ContentEntry) {
  constructor(name, buffer) {
    // @ts-ignore
    super(name);
    Object.defineProperties(this, { buffer: { value: buffer } });
  }

  /**
   *
   * @returns {boolean} true if buffer length is zero
   */
  get isEmpty() {
    return this.buffer.length === 0;
  }

  /**
   * @return {Number} size in bytes
   */
  get size() {
    return this.buffer.length;
  }
}
