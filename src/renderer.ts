import { BOOLEAN_ATTRIBUTES, UNCLOSED_TAGS } from "./tags";
import { ElementNode, Node, isLiteralNode } from "./types";

const ELEMENT_ADAPTERS: {
  [key: string]: (node: ElementNode) => ElementNode;
} = {
  textarea: (node: ElementNode) => {
    if (!("value" in node.properties)) {
      return node;
    }
    const tweaked = {
      ...node,
      properties: { ...node.properties },
    };
    const value = tweaked.properties.value;
    delete tweaked.properties.value;

    if (value != null) {
      tweaked.children = [...tweaked.children, String(value)];
    }

    return tweaked;
  },
};

type ChunkCallback = (chunk: string) => void;

export function render(node: Node): string;
export function render(node: Node, callback: ChunkCallback): void;
export function render(node: Node, stream: WritableStream): void;
export function render(
  node: Node,
  callbackOrStream?: ChunkCallback | WritableStream,
): void | string {
  if (callbackOrStream) {
    if (typeof callbackOrStream === "function") {
      internalRender(node, callbackOrStream);
    } else {
      const writer = callbackOrStream.getWriter();
      internalRender(node, (chunk) => {
        writer.write(chunk);
      });
    }
  } else {
    const result: string[] = [];
    internalRender(node, (chunk) => result.push(chunk));
    return result.join("");
  }
}

function internalRender(node: Node, callback: ChunkCallback) {
  if (node == null || node === false) {
    return;
  }

  if (typeof node === "string") {
    callback(htmlEncode(node));
    return;
  }

  if (isLiteralNode(node)) {
    callback(node.content);
    return;
  }

  if (Array.isArray(node)) {
    node.forEach((n) => {
      internalRender(n, callback);
    });
    return;
  }

  const { tagName, properties, children } = ELEMENT_ADAPTERS[node.tagName]
    ? ELEMENT_ADAPTERS[node.tagName](node)
    : node;

  callback(`<${tagName}`);

  Object.keys(properties).forEach((name) => {
    callback(renderHtmlAttribute(name, properties[name]));
  });

  callback(">");

  children.forEach((c) => internalRender(c, callback));

  if (!UNCLOSED_TAGS[tagName]) {
    callback(`</${tagName}>`);
  }
}

function renderHtmlAttribute(name: string, value: unknown) {
  if (Array.isArray(value)) {
    value = value.join(" ");
  }

  const encodedName = htmlEncode(name);

  if (BOOLEAN_ATTRIBUTES[name]) {
    return value ? ` ${encodedName}` : "";
  }

  const encodedValue = htmlEncode(String(value));

  return ` ${encodedName}="${encodedValue}"`;
}

function htmlEncode(s: string): string {
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
