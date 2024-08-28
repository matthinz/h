import {
  ElementNode,
  isElementNode,
  isLiteralNode,
  Node,
  Properties,
} from "./types";

type Writer = (value: string, onNewLine: boolean) => void;

type ElementWriter = (el: ElementNode, write: Writer) => void;

const RENDERERS: { [key: string]: ElementWriter } = {
  a: createInlineElementWriter(
    (_tagName, { href }, content) => `[${content}](${href})`,
  ),
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

export function renderMarkdown(node: Node): string {
  const buffer = createBufferedWriter();
  internalRenderMarkdown(node, buffer);
  return buffer.toString();
}

function renderElementNode(el: ElementNode, write: Writer) {
  const renderer = RENDERERS[el.tagName] ?? DEFAULT_BLOCK_ELEMENT_WRITER;
  renderer(el, write);
}

function internalRenderMarkdown(node: Node, write: Writer) {
  if (node == null || !node) {
    return;
  }

  if (Array.isArray(node)) {
    node.forEach((n) => internalRenderMarkdown(n, write));
    return;
  }

  if (isElementNode(node)) {
    renderElementNode(node, write);
    return;
  }

  const text = isLiteralNode(node) ? node.content : node;
  write(text, false);
}

function createBlockElementWriter(
  prefix: string,
  suffix: string,
): ElementWriter {
  return (el: ElementNode, write: Writer) => {
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

function createInlineElementWriter(
  formatter: (
    tagName: string,
    properties: Properties,
    content: string,
  ) => string,
): ElementWriter;
function createInlineElementWriter(
  prefix: string,
  suffix?: string,
): ElementWriter;
function createInlineElementWriter(
  formatterOrPrefix:
    | string
    | ((tagName: string, properties: Properties, content: string) => string),
  suffix?: string,
): ElementWriter {
  const formatter =
    typeof formatterOrPrefix === "function"
      ? formatterOrPrefix
      : (_tagName: string, _properties: Properties, content: string) => {
          return `${formatterOrPrefix}${content}${suffix ?? ""}`;
        };

  return (el: ElementNode, write: Writer) => {
    const buffer = createBufferedWriter();
    el.children.forEach((child) => {
      internalRenderMarkdown(child, buffer);
    });

    write(formatter(el.tagName, el.properties, buffer.toString()), false);
  };
}

function createListWriter(
  numberer: string[] | ((index: number) => string),
): ElementWriter {
  return (el, write) => {
    let itemIndex = 0;

    el.children.forEach((child) => {
      if (isElementNode(child) && child.tagName === "li") {
        const buffer = createBufferedWriter();
        child.children.forEach((c) => internalRenderMarkdown(c, buffer));

        const [firstLine, ...otherLines] = buffer.toString().split("\n");

        let bullet: string;
        if (Array.isArray(numberer)) {
          bullet = numberer[0];
        } else {
          bullet = numberer(itemIndex);
        }

        write(`${bullet}${firstLine}`, true);
        otherLines.forEach((l) => write(`  ${l}\n`, true));

        itemIndex += 1;
      } else {
        internalRenderMarkdown(child, write);
      }
    });
  };
}

function createBufferedWriter(): Writer {
  const buffer: string[] = [];
  const bufferedWriter = (value: string, onNewLine: boolean) => {
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
