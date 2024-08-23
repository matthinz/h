import { TaggedH } from "./types";
export declare const HTML_TAGS: readonly ["a", "div", "span", "p"];
export declare const UNCLOSED_TAGS: {
    [key: string]: boolean | undefined;
};
export declare const BOOLEAN_ATTRIBUTES: {
    [key: string]: boolean | undefined;
};
type TagFactories = {
    [key in (typeof HTML_TAGS)[number]]: TaggedH;
};
export declare const TAGS: TagFactories;
export {};
