import test from "ava";
import { it, collect } from "./helpers/util.mjs";

import {
  keyValueTransformer,
  equalSeparatedKeyValuePairOptions
} from "key-value-transformer";

test.skip("same key sevaral times", async t => {

  function* values(k, v) {
    if (k !== undefined) {
      yield [k, v];
    }
  }
  
  t.is(
    await collect(
      keyValueTransformer(
        it(["Requires:", "p1 > 1.0\nRequires: p2 = 2.0"]),
        values,
        equalSeparatedKeyValuePairOptions
      )
    ),
    "XXXX"
  );
});
