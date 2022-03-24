import test from "ava";
import { it, collect } from "./helpers/util.mjs";

import {
  keyValueTransformer,
  colonSeparatedKeyValuePairOptionsDoublingKeys
} from "key-value-transformer";

test("same key sevaral times", async t => {

  function* values(k, v) {
    if (k === 'Requires') {
      yield [k, ["p1>1.0", "p2=2.0"]];
    }
  }
  
  t.is(
    await collect(
      keyValueTransformer(
        it(["Requires: hugo"]),
        values,
        colonSeparatedKeyValuePairOptionsDoublingKeys
      )
    ),
    `Requires: p1>1.0
Requires: p2=2.0
`
  );
});
