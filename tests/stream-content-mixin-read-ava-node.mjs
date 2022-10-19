import test from "ava";
import { Readable } from "#stream.mjs";
import { ContentEntry, StreamContentEntryMixin } from "content-entry";

class TestReadable extends Readable {
  constructor(chunks) {
    super();
    Object.defineProperties(this, { chunks: { value: chunks } });
  }

  _read(size) {
    const c = this.chunks.shift();
    if (c === undefined) {
      this.push(null);
      return;
    }

    this.push(c);
  }
}

class TestEntry extends StreamContentEntryMixin(ContentEntry) {
  async getReadStream(options) {
    return new TestReadable(["a", "b", "c"]);
  }
}

test("string read (chunks)", async t => {
  const entry = new TestEntry("reading");
  t.is(await entry.string, "abc");
});
