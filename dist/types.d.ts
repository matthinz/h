export type H = {
    (tagName: string): ElementNode;
    (tagName: string, properties: Properties): ElementNode;
    (tagName: string, children: Node): ElementNode;
    (tagName: string, properties: Properties, children: Node): ElementNode;
};
export type Node = ElementNode | LiteralNode | string | null | undefined | false | Node[];
export type LiteralNode = {
    readonly content: string;
};
export type ElementNode = {
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
