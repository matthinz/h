"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.literal = void 0;
const types_1 = require("./types");
function literal(content) {
    return {
        [types_1.NodeTypeSymbol]: types_1.NODE_TYPE_LITERAL,
        content,
    };
}
exports.literal = literal;
//# sourceMappingURL=literal.js.map