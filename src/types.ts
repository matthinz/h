export const NodeTypeSymbol = Symbol("node_type");

export const NODE_TYPE_LITERAL = 1 as const;
export const NODE_TYPE_ELEMENT = 2 as const;

type NodeTypeLiteral = typeof NODE_TYPE_LITERAL;
type NodeTypeElement = typeof NODE_TYPE_ELEMENT;

export type H = {
  (tagName: string): ElementNode;
  (tagName: string, properties: Properties): ElementNode;
  (tagName: string, children: Node): ElementNode;
  (tagName: string, properties: Properties, children: Node): ElementNode;
};

export type Node =
  | ElementNode
  | LiteralNode
  | string
  | null
  | undefined
  | false
  | Node[];

export type LiteralNode = {
  readonly [NodeTypeSymbol]: NodeTypeLiteral;
  readonly content: string;
};

export type ElementNode = {
  readonly [NodeTypeSymbol]: NodeTypeElement;
  readonly tagName: string;
  readonly properties: Properties;
  readonly children: Node[];
};

export type Properties = { readonly [key: string]: unknown };

export function isElementNode(x: unknown): x is ElementNode {
  if (!x || typeof x !== "object") {
    return false;
  }
  return NodeTypeSymbol in x && x[NodeTypeSymbol] === NODE_TYPE_ELEMENT;
}

export function isLiteralNode(x: unknown): x is LiteralNode {
  if (!x || typeof x !== "object") {
    return false;
  }
  return NodeTypeSymbol in x && x[NodeTypeSymbol] === NODE_TYPE_LITERAL;
}

export function isNode(x: unknown): x is Node {
  if (x == null || x === false) {
    return true;
  }

  if (typeof x === "string") {
    return true;
  }

  if (Array.isArray(x)) {
    return x.every(isNode);
  }

  return isLiteralNode(x) || isElementNode(x);
}
