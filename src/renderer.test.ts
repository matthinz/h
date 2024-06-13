import assert from "node:assert";
import { describe, it } from "node:test";

import { h, render } from ".";

describe("#render", () => {
  it("renders deep trees", () => {
    assert.equal(
      render(
        h("div", { class: "foo" }, [h("div", { class: "bar" }, ["some text"])]),
      ),
      '<div class="foo"><div class="bar">some text</div></div>',
    );
  });

  it("sorts attributes", () => {
    assert.equal(
      render(h("div", { "data-z": "foo", "data-a": "bar", "data-c": "baz" })),
      '<div data-a="bar" data-c="baz" data-z="foo"></div>',
    );
  });

  describe("literal nodes", () => {
    it("is rendered literally", () => {
      assert.equal(render({ content: "<!doctype html>" }), "<!doctype html>");
    });
  });

  describe("specific tags", () => {
    describe("<input>", () => {
      describe(".checked", () => {
        it("does not include attribute when false", () => {
          assert.equal(
            render(h("input", { type: "checkbox", checked: false })),
            '<input type="checkbox">',
          );
        });

        it("includes attribute when true", () => {
          assert.equal(
            render(h("input", { type: "checkbox", checked: true })),
            '<input checked type="checkbox">',
          );
        });
      });
    });
    describe("<textarea>", () => {
      describe(".value", () => {
        it("is rendered inside", () => {
          assert.equal(
            render(h("textarea", { name: "foo", value: "abcd\n1234" })),
            `<textarea name="foo">abcd\n1234</textarea>`,
          );
        });
        it("handles when not present", () => {
          assert.equal(
            render(h("textarea", { name: "foo" })),
            `<textarea name="foo"></textarea>`,
          );
        });
      });
    });
  });
});
