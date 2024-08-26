import assert from "node:assert";
import { describe, it } from "node:test";

import { renderMarkdown, TAGS } from ".";

const { h1, li, ul } = TAGS;

describe("#render", () => {
  it("renders h1", () => {
    assert.equal(renderMarkdown(h1("Hi there!")), "# Hi there!");
  });

  it("renders ul", () => {
    assert.equal(
      renderMarkdown(ul([li("foo"), li("bar")])),
      `
* foo
* bar
      `.trim(),
    );
  });
});
