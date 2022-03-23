import test from "ava";
import { it, collect, identity } from "./helpers/util.mjs";

import {
  keyValueTransformer,
  equalSeparatedKeyValuePairOptions
} from "key-value-transformer";

test.skip("same key sevaral times", async t => {
  t.is(
    await collect(
      keyValueTransformer(
        it(["Requires:", "p1 > 1.0\nRequires: p2 = 2.0"]),
        identity,
        equalSeparatedKeyValuePairOptions
      )
    ),
    "XXXX"
  );
});
