"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMarkdown = void 0;
const types_1 = require("./types");
const RENDERERS = {
    h1: (node) => `# ${renderMarkdown(node.children)}`,
    ul: (node) => {
        return node.children
            .map((child) => {
            if ((0, types_1.isElementNode)(child) && child.tagName === "li") {
                return `* ${renderElementNode(child)}`;
            }
            else {
                return renderMarkdown(child);
            }
        })
            .join("\n");
    },
};
function renderMarkdown(node) {
    if (node == null || !node) {
        return "";
    }
    if (Array.isArray(node)) {
        return node.map(renderMarkdown).join("\n");
    }
    if ((0, types_1.isElementNode)(node)) {
        return renderElementNode(node);
    }
    if ((0, types_1.isLiteralNode)(node)) {
        return node.content;
    }
    return node;
}
exports.renderMarkdown = renderMarkdown;
function renderElementNode(el) {
    const renderer = RENDERERS[el.tagName];
    if (renderer) {
        return renderer(el);
    }
    return el.children.map(renderMarkdown).join("\n");
}
//# sourceMappingURL=markdown.js.map