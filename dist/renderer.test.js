"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = __importDefault(require("node:assert"));
const node_test_1 = require("node:test");
const _1 = require(".");
(0, node_test_1.describe)("#render", () => {
    (0, node_test_1.it)("renders deep trees", () => {
        node_assert_1.default.equal((0, _1.render)((0, _1.h)("div", { class: "foo" }, [(0, _1.h)("div", { class: "bar" }, ["some text"])])), '<div class="foo"><div class="bar">some text</div></div>');
    });
    (0, node_test_1.it)("sorts attributes", () => {
        node_assert_1.default.equal((0, _1.render)((0, _1.h)("div", { "data-z": "foo", "data-a": "bar", "data-c": "baz" })), '<div data-a="bar" data-c="baz" data-z="foo"></div>');
    });
    (0, node_test_1.describe)("literal nodes", () => {
        (0, node_test_1.it)("is rendered literally", () => {
            node_assert_1.default.equal((0, _1.render)({ content: "<!doctype html>" }), "<!doctype html>");
        });
    });
    (0, node_test_1.describe)("specific tags", () => {
        (0, node_test_1.describe)("<input>", () => {
            (0, node_test_1.describe)(".checked", () => {
                (0, node_test_1.it)("does not include attribute when false", () => {
                    node_assert_1.default.equal((0, _1.render)((0, _1.h)("input", { type: "checkbox", checked: false })), '<input type="checkbox">');
                });
                (0, node_test_1.it)("includes attribute when true", () => {
                    node_assert_1.default.equal((0, _1.render)((0, _1.h)("input", { type: "checkbox", checked: true })), '<input checked type="checkbox">');
                });
            });
        });
        (0, node_test_1.describe)("<textarea>", () => {
            (0, node_test_1.describe)(".value", () => {
                (0, node_test_1.it)("is rendered inside", () => {
                    node_assert_1.default.equal((0, _1.render)((0, _1.h)("textarea", { name: "foo", value: "abcd\n1234" })), `<textarea name="foo">abcd\n1234</textarea>`);
                });
                (0, node_test_1.it)("handles when not present", () => {
                    node_assert_1.default.equal((0, _1.render)((0, _1.h)("textarea", { name: "foo" })), `<textarea name="foo"></textarea>`);
                });
            });
        });
    });
});
//# sourceMappingURL=renderer.test.js.map