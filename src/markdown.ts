import { ElementNode, isElementNode, isLiteralNode, Node } from "./types";

type Renderer = (el: ElementNode) => string;

const RENDERERS: { [key: string]: Renderer } = {
  h1: (node) => `# ${renderMarkdown(node.children)}`,
  ul: (node) => {
    return node.children
      .map((child) => {
        if (isElementNode(child) && child.tagName === "li") {
          return `* ${renderElementNode(child)}`;
        } else {
          return renderMarkdown(child);
        }
      })
      .join("\n");
  },
};

export function renderMarkdown(node: Node): string {
  if (node == null || !node) {
    return "";
  }

  if (Array.isArray(node)) {
    return node.map(renderMarkdown).join("\n");
  }

  if (isElementNode(node)) {
    return renderElementNode(node);
  }

  if (isLiteralNode(node)) {
    return node.content;
  }

  return node;
}

function renderElementNode(el: ElementNode): string {
  const renderer = RENDERERS[el.tagName];
  if (renderer) {
    return renderer(el);
  }

  return el.children.map(renderMarkdown).join("\n");
}
