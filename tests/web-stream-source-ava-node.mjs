import test from "ava";
import { collect } from "./helpers/util.mjs";

import {
  keyValueTransformer,
  colonSeparatedKeyValuePairOptionsDoublingKeys,
  Uint8ArraysToLines
} from "key-value-transformer";

test("web stream source", async t => {
  function* values(k, v) {
    if (k === "Requires") {
      yield [k, ["p1>1.0", "p2=2.0"]];
    }
  }

  const result = await fetch(
    "https://raw.githubusercontent.com/arlac77/key-value-transformer/refs/heads/master/tests/fixtures/file1.txt"
  );

  t.is(
    await collect(
      keyValueTransformer(
        Uint8ArraysToLines(result.body.values()),
        values,
        colonSeparatedKeyValuePairOptionsDoublingKeys
      )
    ),
    `Requires: p1>1.0
Requires: p2=2.0
`
  );
});
