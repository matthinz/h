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
  readonly __content__: string;
};

export type ElementNode = {
  readonly tagName: string;
  readonly properties: Properties;
  readonly children: Node[];
};

export type Properties = { readonly [key: string]: unknown };

export function isElementNode(x: unknown): x is ElementNode {
  if (!x || typeof x !== "object") {
    return false;
  }
  return !!(
    "tagName" in x &&
    typeof x.tagName === "string" &&
    "properties" in x &&
    x.properties &&
    "children" in x &&
    Array.isArray(x.children)
  );
}

export function isLiteralNode(x: unknown): x is LiteralNode {
  if (!x || typeof x !== "object") {
    return false;
  }
  return !!("__content__" in x && typeof x.__content__ === "string");
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
