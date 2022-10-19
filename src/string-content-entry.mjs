// @ts-check
import { StringContentEntryMixin } from "./string-content-entry-mixin.mjs";
import { ContentEntry } from "./content-entry.mjs";

/**
 * Content entries where a string is the primary data representation.
 *
 * @param {string} name
 * @param {string} value
 *
 * @property {string} name
 * @property {string} string
 */
export class StringContentEntry extends StringContentEntryMixin(ContentEntry) {
  constructor(name, value) {
    // @ts-ignore
    super(name);
    Object.defineProperties(this, { string: { value } });
  }

  /**
   *
   * @returns {boolean} true if string length is zero
   */
  get isEmpty() {
    return this.string.length === 0;
  }
}
