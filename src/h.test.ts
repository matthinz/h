import assert from "node:assert";
import { describe, it } from "node:test";
import { h } from "./h";

describe("#h", () => {
  it("accepts just tagName", () => {
    assert.deepEqual(h("div"), {
      tagName: "div",
      properties: {},
      children: [],
    });
  });

  it("accepts tagName + props", () => {
    assert.deepEqual(h("div", { class: "foo" }), {
      tagName: "div",
      properties: { class: "foo" },
      children: [],
    });
  });

  it("accepts tagName + children", () => {
    assert.deepEqual(h("div", ["some text"]), {
      tagName: "div",
      properties: {},
      children: ["some text"],
    });
  });

  it("accepts tagName + string child", () => {
    assert.deepEqual(h("div", "some text"), {
      tagName: "div",
      properties: {},
      children: ["some text"],
    });
  });

  it("accepts tagName + properties + children", () => {
    assert.deepEqual(h("div", { class: "foo" }, ["some text"]), {
      tagName: "div",
      properties: { class: "foo" },
      children: ["some text"],
    });
  });
});
