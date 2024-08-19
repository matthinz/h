"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = __importDefault(require("node:assert"));
const node_test_1 = require("node:test");
const h_1 = require("./h");
(0, node_test_1.describe)("#h", () => {
    (0, node_test_1.it)("accepts just tagName", () => {
        node_assert_1.default.deepEqual((0, h_1.h)("div"), {
            tagName: "div",
            properties: {},
            children: [],
        });
    });
    (0, node_test_1.it)("accepts tagName + props", () => {
        node_assert_1.default.deepEqual((0, h_1.h)("div", { class: "foo" }), {
            tagName: "div",
            properties: { class: "foo" },
            children: [],
        });
    });
    (0, node_test_1.it)("accepts tagName + children", () => {
        node_assert_1.default.deepEqual((0, h_1.h)("div", ["some text"]), {
            tagName: "div",
            properties: {},
            children: ["some text"],
        });
    });
    (0, node_test_1.it)("accepts tagName + string child", () => {
        node_assert_1.default.deepEqual((0, h_1.h)("div", "some text"), {
            tagName: "div",
            properties: {},
            children: ["some text"],
        });
    });
    (0, node_test_1.it)("accepts tagName + properties + children", () => {
        node_assert_1.default.deepEqual((0, h_1.h)("div", { class: "foo" }, ["some text"]), {
            tagName: "div",
            properties: { class: "foo" },
            children: ["some text"],
        });
    });
    (0, node_test_1.it)("turns array values into space-separated strings", () => {
        node_assert_1.default.deepEqual((0, h_1.h)("div", {
            class: ["foo", "bar", "baz"],
        }), {
            tagName: "div",
            properties: {
                class: "foo bar baz",
            },
            children: [],
        });
    });
    (0, node_test_1.it)("accepts nested attributes", () => {
        node_assert_1.default.deepEqual((0, h_1.h)("div", {
            data: {
                foo: {
                    bar: "baz",
                },
            },
        }), {
            tagName: "div",
            properties: {
                "data-foo-bar": "baz",
            },
            children: [],
        });
    });
});
