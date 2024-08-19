import { Node } from "./types";
type WriteCallback = (data: string) => void;
export declare function render(node: Node): string;
export declare function render(node: Node, callback: WriteCallback): void;
export declare function render(node: Node, stream: WritableStream): void;
export {};
