import assert from "node:assert";
import { describe, it } from "node:test";

import { renderMarkdown, TAGS } from ".";

const { h1, li, ol, ul } = TAGS;

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

  it("renders ol", () => {
    assert.equal(
      renderMarkdown(ol([li("foo"), li("bar")])),
      `
1. foo
2. bar
      `.trim(),
    );
  });

  it("renders nested ul", () => {
    assert.equal(
      renderMarkdown(ul([li(["foo", ul([li("bar"), li("baz")])]), li("bat")])),
      `
* foo
  * bar
  * baz
* bat
      `.trim(),
    );
  });
});
