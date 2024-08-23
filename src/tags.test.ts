import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "./renderer";
import { TAGS } from "./tags";

describe("TAGS", () => {
  it("can make a span", () => {
    const el = TAGS.span("hi");
    assert.equal(render(el), "<span>hi</span>");
  });
});
