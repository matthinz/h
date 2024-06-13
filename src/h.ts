import { H, Node, Properties, isNode } from "./types";

export const h: H = (
  tagName: string,
  propertiesOrChildOrChildren?: Properties | Node,
  maybeChildren?: Node,
) => {
  let properties: Properties;
  let children: Node[];

  if (propertiesOrChildOrChildren == null) {
    properties = {};
    children = [];
  } else if (isNode(propertiesOrChildOrChildren)) {
    properties = {};
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

  return {
    tagName,
    properties,
    children: children ? (children.filter(Boolean) as Node[]) : [],
  };
};
