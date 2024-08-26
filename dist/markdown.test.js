"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = __importDefault(require("node:assert"));
const node_test_1 = require("node:test");
const _1 = require(".");
const { h1, li, ul } = _1.TAGS;
(0, node_test_1.describe)("#render", () => {
    (0, node_test_1.it)("renders h1", () => {
        node_assert_1.default.equal((0, _1.renderMarkdown)(h1("Hi there!")), "# Hi there!");
    });
    (0, node_test_1.it)("renders ul", () => {
        node_assert_1.default.equal((0, _1.renderMarkdown)(ul([li("foo"), li("bar")])), `
* foo
* bar
      `.trim());
    });
});
//# sourceMappingURL=markdown.test.js.map