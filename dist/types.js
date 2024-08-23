"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNode = exports.isLiteralNode = exports.isElementNode = exports.NODE_TYPE_ELEMENT = exports.NODE_TYPE_LITERAL = exports.NodeTypeSymbol = void 0;
exports.NodeTypeSymbol = Symbol("node_type");
exports.NODE_TYPE_LITERAL = 1;
exports.NODE_TYPE_ELEMENT = 2;
function isElementNode(x) {
    if (!x || typeof x !== "object") {
        return false;
    }
    return exports.NodeTypeSymbol in x && x[exports.NodeTypeSymbol] === exports.NODE_TYPE_ELEMENT;
}
exports.isElementNode = isElementNode;
function isLiteralNode(x) {
    if (!x || typeof x !== "object") {
        return false;
    }
    return exports.NodeTypeSymbol in x && x[exports.NodeTypeSymbol] === exports.NODE_TYPE_LITERAL;
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
//# sourceMappingURL=types.js.map