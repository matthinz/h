export const HTML_TAGS = ["a", "div", "span", "p"] as const;

export const UNCLOSED_TAGS: { [key: string]: boolean | undefined } = {
  img: true,
  input: true,
  link: true,
} as const;

export const BOOLEAN_ATTRIBUTES: { [key: string]: boolean | undefined } = {
  checked: true,
  disabled: true,
  readonly: true,
} as const;
