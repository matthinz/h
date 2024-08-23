"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = __importDefault(require("node:assert"));
const node_test_1 = require("node:test");
const renderer_1 = require("./renderer");
const tags_1 = require("./tags");
(0, node_test_1.describe)("TAGS", () => {
    (0, node_test_1.it)("can make a span", () => {
        const el = tags_1.TAGS.span("hi");
        node_assert_1.default.equal((0, renderer_1.render)(el), "<span>hi</span>");
    });
});
//# sourceMappingURL=tags.test.js.map