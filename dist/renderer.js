"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
const tags_1 = require("./tags");
const types_1 = require("./types");
const NOOP = () => { };
const ELEMENT_ADAPTERS = {
    textarea: (node) => {
        if (!("value" in node.properties)) {
            return node;
        }
        const tweaked = Object.assign(Object.assign({}, node), { properties: Object.assign({}, node.properties) });
        const value = tweaked.properties.value;
        delete tweaked.properties.value;
        if (value != null) {
            tweaked.children = [...tweaked.children, String(value)];
        }
        return tweaked;
    },
};
function render(node, callbackOrStream) {
    if (callbackOrStream) {
        if (typeof callbackOrStream === "function") {
            internalRender(node, {
                write: callbackOrStream,
                flush: NOOP,
            });
        }
        else {
            const writer = callbackOrStream.getWriter();
            internalRender(node, {
                write(chunk) {
                    writer.write(chunk);
                },
                flush: NOOP,
            });
        }
    }
    else {
        let result = [];
        internalRender(node, {
            write(chunk) {
                result.push(chunk);
            },
            flush() {
                result = [result.join("")];
            },
        });
        return result.join("");
    }
}
exports.render = render;
function internalRender(node, { write, flush }) {
    if (node == null || node === false) {
        return;
    }
    if (typeof node === "string") {
        write(htmlEncode(node));
        return;
    }
    if ((0, types_1.isLiteralNode)(node)) {
        write(node.content);
        flush();
        return;
    }
    if (Array.isArray(node)) {
        node.forEach((n) => {
            internalRender(n, {
                write,
                flush: NOOP,
            });
        });
        flush();
        return;
    }
    const { tagName, properties, children } = ELEMENT_ADAPTERS[node.tagName]
        ? ELEMENT_ADAPTERS[node.tagName](node)
        : node;
    write(`<${tagName}`);
    const renderedAttributes = Object.keys(properties).map((name) => renderHtmlAttribute(name, properties[name]));
    renderedAttributes.sort();
    renderedAttributes.forEach((attr) => {
        write(attr);
    });
    write(">");
    flush();
    children.forEach((c) => internalRender(c, { write, flush: NOOP }));
    if (!tags_1.UNCLOSED_TAGS[tagName]) {
        write(`</${tagName}>`);
    }
    flush();
}
function renderHtmlAttribute(name, value) {
    if (Array.isArray(value)) {
        value = value.join(" ");
    }
    const encodedName = htmlEncode(name);
    if (tags_1.BOOLEAN_ATTRIBUTES[name]) {
        return value ? ` ${encodedName}` : "";
    }
    const encodedValue = htmlEncode(String(value));
    return ` ${encodedName}="${encodedValue}"`;
}
function htmlEncode(s) {
    return s.replace(/(<|>|"|')/g, (c) => {
        switch (c) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case '"':
                return "&quot;";
            case "'":
                return "&apos;";
            default:
                return c;
        }
    });
}
//# sourceMappingURL=renderer.js.map