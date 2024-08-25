import assert from "node:assert";
import { describe, it } from "node:test";

import { h } from "./h";
import { NODE_TYPE_ELEMENT, NodeTypeSymbol } from "./types";

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

  it("turns array values into space-separated strings", () => {
    assert.deepEqual(
      h("div", {
        class: ["foo", "bar", "baz"],
      }),
      {
        tagName: "div",
        properties: {
          class: "foo bar baz",
        },
        children: [],
      },
    );
  });

  it("accepts nested attributes", () => {
    assert.deepEqual(
      h("div", {
        data: {
          foo: {
            bar: "baz",
          },
        },
      }),
      {
        tagName: "div",
        properties: {
          "data-foo-bar": "baz",
        },
        children: [],
      },
    );
  });

  it("allows passing an object for class", () => {
    assert.deepEqual(
      h(
        "div",
        {
          class: {
            "should-appear": true,
            "should-not-appear": false,
          },
        },
        [],
      ),
      {
        [NodeTypeSymbol]: NODE_TYPE_ELEMENT,
        tagName: "div",
        properties: {
          class: "should-appear",
        },
        children: [],
      },
    );
  });
});
