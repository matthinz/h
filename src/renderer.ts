import { BOOLEAN_ATTRIBUTES, UNCLOSED_TAGS } from "./tags";
import { ElementNode, Node, isLiteralNode } from "./types";

const NOOP = () => {};

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

type WriteCallback = (data: string) => void;
type FlushCallback = () => void;

export function render(node: Node): string;
export function render(node: Node, callback: WriteCallback): void;
export function render(node: Node, stream: WritableStream): void;
export function render(
  node: Node,
  callbackOrStream?: WriteCallback | WritableStream,
): void | string {
  if (callbackOrStream) {
    if (typeof callbackOrStream === "function") {
      internalRender(node, {
        write: callbackOrStream,
        flush: NOOP,
      });
    } else {
      const writer = callbackOrStream.getWriter();
      internalRender(node, {
        write(chunk) {
          writer.write(chunk);
        },
        flush: NOOP,
      });
    }
  } else {
    let result: string[] = [];
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

type InternalRenderOptions = {
  write: WriteCallback;
  flush: FlushCallback;
};

function internalRender(node: Node, { write, flush }: InternalRenderOptions) {
  if (node == null || node === false) {
    return;
  }

  if (typeof node === "string") {
    write(htmlEncode(node));
    return;
  }

  if (isLiteralNode(node)) {
    write(node.__content__);
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

  const renderedAttributes = Object.keys(properties).map((name) =>
    renderHtmlAttribute(name, properties[name]),
  );

  renderedAttributes.sort();

  renderedAttributes.forEach((attr) => {
    write(attr);
  });

  write(">");

  flush();

  children.forEach((c) => internalRender(c, { write, flush: NOOP }));

  if (!UNCLOSED_TAGS[tagName]) {
    write(`</${tagName}>`);
  }

  flush();
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
