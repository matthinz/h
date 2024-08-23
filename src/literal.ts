import { LiteralNode, NODE_TYPE_LITERAL, NodeTypeSymbol } from "./types";

export function literal(content: string): LiteralNode {
  return {
    [NodeTypeSymbol]: NODE_TYPE_LITERAL,
    content,
  };
}
