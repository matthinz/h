"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNode = exports.isLiteralNode = exports.isElementNode = void 0;
function isElementNode(x) {
    if (!x || typeof x !== "object") {
        return false;
    }
    return !!("tagName" in x &&
        typeof x.tagName === "string" &&
        "properties" in x &&
        x.properties &&
        "children" in x &&
        Array.isArray(x.children));
}
exports.isElementNode = isElementNode;
function isLiteralNode(x) {
    if (!x || typeof x !== "object") {
        return false;
    }
    return !!("content" in x && typeof x.content === "string");
}
exports.isLiteralNode = isLiteralNode;
function isNode(x) {
    if (x == null || x === false) {
        return true;
    }
    if (typeof x === "string") {
        return true;
    }
    if (Array.isArray(x)) {
        return x.every(isNode);
    }
    return isLiteralNode(x) || isElementNode(x);
}
exports.isNode = isNode;
