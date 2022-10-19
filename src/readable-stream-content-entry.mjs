// @ts-check
import { StreamContentEntryMixin } from "./stream-content-entry-mixin.mjs";
import { ContentEntry } from "./content-entry.mjs";

/**
 * Content entries where a readable stream is the primary data representation.
 *
 * @param {string} name
 * @param {ReadableStream} readStream
 *
 * @property {string} name
 * @property {ReadableStream} readStream
 */
export class ReadableStreamContentEntry extends StreamContentEntryMixin(
  ContentEntry
) {
  constructor(name, readStream) {
    // @ts-ignore
    super(name);
    Object.defineProperties(this, { readStream: { value: readStream } });
  }
}
