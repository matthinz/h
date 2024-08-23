import { element } from "./element";
import { H, Node, Properties, isNode } from "./types";

export const h: H = (
  tagName: string,
  propertiesOrChildOrChildren?: Properties | Node,
  maybeChildren?: Node,
) => {
  let properties: Properties | undefined;
  let children: Node[];

  if (propertiesOrChildOrChildren == null) {
    children = [];
  } else if (isNode(propertiesOrChildOrChildren)) {
    children = Array.isArray(propertiesOrChildOrChildren)
      ? propertiesOrChildOrChildren
      : [propertiesOrChildOrChildren];
  } else {
    properties = propertiesOrChildOrChildren;
    if (maybeChildren == null) {
      children = [];
    } else {
      children = Array.isArray(maybeChildren) ? maybeChildren : [maybeChildren];
    }
  }

  return element(tagName, properties ?? {}, children);
};
