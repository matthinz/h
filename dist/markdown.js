"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMarkdown = void 0;
const types_1 = require("./types");
const RENDERERS = {
    a: createInlineElementWriter((_tagName, { href }, content) => `[${content}](${href})`),
    h1: createBlockElementWriter("# ", ""),
    h2: createBlockElementWriter("## ", ""),
    h3: createBlockElementWriter("### ", ""),
    h4: createBlockElementWriter("#### ", ""),
    h5: createBlockElementWriter("##### ", ""),
    h6: createBlockElementWriter("###### ", ""),
    ol: createListWriter((index) => `${index + 1}. `),
    ul: createListWriter(["* "]),
};
const DEFAULT_BLOCK_ELEMENT_WRITER = createBlockElementWriter("", "");
function renderMarkdown(node) {
    const buffer = createBufferedWriter();
    internalRenderMarkdown(node, buffer);
    return buffer.toString();
}
exports.renderMarkdown = renderMarkdown;
function renderElementNode(el, write) {
    var _a;
    const renderer = (_a = RENDERERS[el.tagName]) !== null && _a !== void 0 ? _a : DEFAULT_BLOCK_ELEMENT_WRITER;
    renderer(el, write);
}
function internalRenderMarkdown(node, write) {
    if (node == null || !node) {
        return;
    }
    if (Array.isArray(node)) {
        node.forEach((n) => internalRenderMarkdown(n, write));
        return;
    }
    if ((0, types_1.isElementNode)(node)) {
        renderElementNode(node, write);
        return;
    }
    const text = (0, types_1.isLiteralNode)(node) ? node.content : node;
    write(text, false);
}
function createBlockElementWriter(prefix, suffix) {
    return (el, write) => {
        const buffer = createBufferedWriter();
        el.children.forEach((child) => {
            internalRenderMarkdown(child, buffer);
        });
        buffer
            .toString()
            .split("\n")
            .forEach((line) => write(`${prefix}${line}${suffix}`, true));
    };
}
function createInlineElementWriter(formatterOrPrefix, suffix) {
    const formatter = typeof formatterOrPrefix === "function"
        ? formatterOrPrefix
        : (_tagName, _properties, content) => {
            return `${formatterOrPrefix}${content}${suffix !== null && suffix !== void 0 ? suffix : ""}`;
        };
    return (el, write) => {
        const buffer = createBufferedWriter();
        el.children.forEach((child) => {
            internalRenderMarkdown(child, buffer);
        });
        write(formatter(el.tagName, el.properties, buffer.toString()), false);
    };
}
function createListWriter(numberer) {
    return (el, write) => {
        let itemIndex = 0;
        el.children.forEach((child) => {
            if ((0, types_1.isElementNode)(child) && child.tagName === "li") {
                const buffer = createBufferedWriter();
                child.children.forEach((c) => internalRenderMarkdown(c, buffer));
                const [firstLine, ...otherLines] = buffer.toString().split("\n");
                let bullet;
                if (Array.isArray(numberer)) {
                    bullet = numberer[0];
                }
                else {
                    bullet = numberer(itemIndex);
                }
                write(`${bullet}${firstLine}`, true);
                otherLines.forEach((l) => write(`  ${l}\n`, true));
                itemIndex += 1;
            }
            else {
                internalRenderMarkdown(child, write);
            }
        });
    };
}
function createBufferedWriter() {
    const buffer = [];
    const bufferedWriter = (value, onNewLine) => {
        if (onNewLine) {
            if (buffer.length > 0 && !buffer[buffer.length - 1].endsWith("\n")) {
                buffer.push("\n");
            }
        }
        buffer.push(value);
    };
    bufferedWriter.toString = () => buffer.join("");
    return bufferedWriter;
}
//# sourceMappingURL=markdown.js.map