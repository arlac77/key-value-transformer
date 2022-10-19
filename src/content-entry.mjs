// @ts-check
import { BaseEntry } from "./base-entry.mjs";
import { equalsUint8Arrays } from "./util.mjs";

/**
 * General content access entries.
 */
export class ContentEntry extends BaseEntry {
  /**
   * @return {boolean} true
   */
  get isBlob() {
    return true;
  }

  /**
   * UTI types for this entry.
   * defaults to "public.content".
   * @return {string[]}
   */
  get types() {
    return ["public.content"];
  }

  /**
   * @return {any} undefined
   */
  get readStream() {
    return undefined;
  }

  /**
   * @return {string}
   */
  get string() {
    return undefined;
  }

  /**
   * return {Uint8Array}
   */
  get buffer() {
    return undefined;
  }

  /**
   * The default encoding used to convert content to strings.
   * @return {BufferEncoding}
   */
  get encoding() {
    return "utf8";
  }

  /**
   * Compare content against other entry.
   * @param {ContentEntry} other
   * @return {Promise<boolean>} true if other has the same content (bitwise)
   */
  async equalsContent(other) {
    if (other === undefined) {
      return false;
    }

    const [a, b] = await Promise.all([this.buffer, other.buffer]);

    if (a === undefined) {
      return b === undefined;
    }

    return equalsUint8Arrays(a, b);
  }

  /**
   * @deprecated
   */
  async getReadStream() {
    return this.readStream;
  }
}
