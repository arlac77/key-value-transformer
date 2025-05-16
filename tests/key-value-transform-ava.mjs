import test from "ava";
import { it, collect, identity } from "./helpers/util.mjs";
import {
  keyValueTransformer,
  equalSeparatedKeyValuePairOptions,
  stringsToLines
} from "key-value-transformer";

async function kvtt(t, input, updates, options, result) {
  t.is(
    await collect(keyValueTransformer(stringsToLines(it(input)), updates, options)),
    result,
    result
  );
}

kvtt.title = (
  providedTitle = "keyValueTransformer",
  input,
  updates,
  options,
  result
) =>
  ` ${providedTitle} ${JSON.stringify(input)} -> ${JSON.stringify(
    result
  )}`.trim();

const properties = { Name: "aName", Version: "1.2.3" };

function* props(k, v) {
  if (k == undefined) {
    yield ["extra1", ["value1", "value2"]];
    yield ["extra2", "value"];
  } else {
    yield [k, properties[k]];
  }
}

function* versionOnly(k, v) {
  if (k === "Version") {
    yield [k, "1.2.3"];
  }
}

function* descriptionOnly(k, v) {
  if (k === undefined) {
  } else {
    if (k === "Description") {
      yield [k, "replaced"];
    } else {
      yield [k, "a name"];
    }
  }
}

test(kvtt, ["# some content"], identity, undefined, "# some content\n");

async function* trailingLines() {
  yield "t1\n";
  yield "t2\n";
}

test(kvtt, ["p", "1: v1\np2:  v2"], identity, undefined, "p1: v1\np2: v2\n");
test(
  kvtt,
  ["p", "1=v1\np2=v2"],
  identity,
  {
    ...equalSeparatedKeyValuePairOptions,
    trailingLines
  },
  "p1=v1\np2=v2\nt1\nt2\n"
);

test(
  kvtt,
  ["Nam", "e:\nVersion: 0.0.0"],
  props,
  undefined,
  "Name: aName\nVersion: 1.2.3\nextra1: value1,value2\nextra2: value\n"
);

test(
  kvtt,
  ["Nam", "e: x\nVersion: 1.0.0"],
  versionOnly,
  undefined,
  "Version: 1.2.3\n"
);

test(
  kvtt,
  ["Nam", "e: x\nDescription: line1\n line2"],
  descriptionOnly,
  undefined,
  "Name: a name\nDescription: replaced\n"
);
