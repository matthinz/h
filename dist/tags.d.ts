import { TaggedH } from "./types";
export declare const HTML_TAGS: readonly ["a", "body", "address", "article", "div", "h1", "h2", "h3", "h4", "h5", "h6", "li", "ol", "p", "section", "span", "ul"];
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
