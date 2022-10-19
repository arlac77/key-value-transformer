import test from "ava";
import { BaseCollectionEntry } from "content-entry";

test("collection entry create", async t => {
  const entry = new BaseCollectionEntry("somewhere");
  t.is(entry.name, "somewhere");
  t.is(entry.mode, 0o755);
  t.true(entry.isCollection);
  t.true((entry.types).indexOf("public.directory") === 0);
});

test("collection entry equals", async t => {
  const a = new BaseCollectionEntry("a");
  const a2 = new BaseCollectionEntry("a");
  const b = new BaseCollectionEntry("b");
  t.false(await a.equals(b));
  t.true(await a.equals(a));
  t.true(await a.equals(a2));
});
