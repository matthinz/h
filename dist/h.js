"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.h = void 0;
const element_1 = require("./element");
const types_1 = require("./types");
const h = (tagName, propertiesOrChildOrChildren, maybeChildren) => {
    let properties;
    let children;
    if (propertiesOrChildOrChildren == null) {
        children = [];
    }
    else if ((0, types_1.isNode)(propertiesOrChildOrChildren)) {
        children = Array.isArray(propertiesOrChildOrChildren)
            ? propertiesOrChildOrChildren
            : [propertiesOrChildOrChildren];
    }
    else {
        properties = propertiesOrChildOrChildren;
        if (maybeChildren == null) {
            children = [];
        }
        else {
            children = Array.isArray(maybeChildren) ? maybeChildren : [maybeChildren];
        }
    }
    return (0, element_1.element)(tagName, properties !== null && properties !== void 0 ? properties : {}, children);
};
exports.h = h;
//# sourceMappingURL=h.js.map