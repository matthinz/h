import {
  ElementNode,
  Node,
  NODE_TYPE_ELEMENT,
  NodeTypeSymbol,
  Properties,
} from "./types";

type PrimitiveValue = string | number | boolean | Date | bigint;

type ResolvedProperties = {
  [key: string]: PrimitiveValue;
};

type ResolvedProperty = {
  key: string;
  value: PrimitiveValue;
};

export function element(
  tagName: string,
  properties: Properties,
  children?: Node[],
): ElementNode {
  return {
    [NodeTypeSymbol]: NODE_TYPE_ELEMENT,
    tagName,
    properties: normalizeProperties(properties),
    children: children ? (children.filter(Boolean) as Node[]) : [],
  };
}

function normalizeProperties(
  properties: Properties | undefined,
): ResolvedProperties {
  if (properties == null) {
    return {};
  }

  return Object.keys(properties).reduce<ResolvedProperties>((result, key) => {
    expandValues(key, properties[key]).forEach(({ key, value }) => {
      result[key] = value;
    });

    return result;
  }, {});
}

function expandValues(key: string, value: unknown): ResolvedProperty[] {
  if (value == null) {
    return [];
  }

  if (Array.isArray(value)) {
    return [
      {
        key,
        value: value.map((v) => String(v)).join(" "),
      },
    ];
  }

  if (value instanceof Date) {
    return [
      {
        key,
        value: new Date(value.getTime()),
      },
    ];
  }

  if (typeof value === "object") {
    if (key === "class") {
      const classNames = Object.keys(value);
      return [
        {
          key,
          value: classNames
            .filter((className) => {
              const ok = (value as any)[className];
              return ok;
            })
            .join(" "),
        },
      ];
    }

    return Object.keys(value).reduce<ResolvedProperty[]>((result, subkey) => {
      expandValues(subkey, (value as any)[subkey]).forEach((attr) => {
        result.push({
          key: [key, attr.key].join("-"),
          value: attr.value,
        });
      });

      return result;
    }, []);
  }

  switch (typeof value) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
      return [{ key, value }];

    default:
      return [
        {
          key,
          value: String(value),
        },
      ];
  }
}
