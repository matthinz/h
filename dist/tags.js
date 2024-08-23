"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TAGS = exports.BOOLEAN_ATTRIBUTES = exports.UNCLOSED_TAGS = exports.HTML_TAGS = void 0;
const h_1 = require("./h");
exports.HTML_TAGS = [
    "a",
    "body",
    "address",
    "article",
    "div",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "html",
    "li",
    "link",
    "meta",
    "ol",
    "p",
    "section",
    "span",
    "ul",
];
exports.UNCLOSED_TAGS = {
    img: true,
    input: true,
    link: true,
    meta: true,
};
exports.BOOLEAN_ATTRIBUTES = {
    checked: true,
    disabled: true,
    readonly: true,
};
exports.TAGS = exports.HTML_TAGS.reduce((result, tagName) => {
    result[tagName] = makeTaggedH(tagName);
    return result;
}, {});
function makeTaggedH(tagName) {
    return h_1.h.bind(undefined, tagName);
}
//# sourceMappingURL=tags.js.map