import { h } from "./h";
import { TaggedH } from "./types";

export const HTML_TAGS = ["a", "div", "span", "p"] as const;

export const UNCLOSED_TAGS: { [key: string]: boolean | undefined } = {
  img: true,
  input: true,
  link: true,
  meta: true,
} as const;

export const BOOLEAN_ATTRIBUTES: { [key: string]: boolean | undefined } = {
  checked: true,
  disabled: true,
  readonly: true,
} as const;

type TagFactories = { [key in (typeof HTML_TAGS)[number]]: TaggedH };

export const TAGS = HTML_TAGS.reduce<TagFactories>(
  (result, tagName) => {
    result[tagName] = makeTaggedH(tagName);
    return result;
  },
  {} as unknown as TagFactories,
);

function makeTaggedH(tagName: string): TaggedH {
  return h.bind(undefined, tagName) as TaggedH;
}
