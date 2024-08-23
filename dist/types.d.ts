export declare const NodeTypeSymbol: unique symbol;
export declare const NODE_TYPE_LITERAL: 1;
export declare const NODE_TYPE_ELEMENT: 2;
type NodeTypeLiteral = typeof NODE_TYPE_LITERAL;
type NodeTypeElement = typeof NODE_TYPE_ELEMENT;
export type H = {
    (tagName: string): ElementNode;
    (tagName: string, properties: Properties): ElementNode;
    (tagName: string, children: Node): ElementNode;
    (tagName: string, properties: Properties, children: Node): ElementNode;
};
export type Node = ElementNode | LiteralNode | string | null | undefined | false | Node[];
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
export type Properties = {
    readonly [key: string]: unknown;
};
export declare function isElementNode(x: unknown): x is ElementNode;
export declare function isLiteralNode(x: unknown): x is LiteralNode;
export declare function isNode(x: unknown): x is Node;
export {};
