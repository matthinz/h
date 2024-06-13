import { H, Node, Properties, isNode } from "./types";

type PrimitiveValue = string | number | boolean | Date | bigint;

type ResolvedProperties = {
  [key: string]: PrimitiveValue;
};

type ResolvedProperty = {
  key: string;
  value: PrimitiveValue;
};

export const h: H = (
  tagName: string,
  propertiesOrChildOrChildren?: Properties | Node,
  maybeChildren?: Node,
) => {
  let properties: Properties | undefined;
  let children: Node[];

  if (propertiesOrChildOrChildren == null) {
    children = [];
  } else if (isNode(propertiesOrChildOrChildren)) {
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
    properties: normalizeProperties(properties),
    children: children ? (children.filter(Boolean) as Node[]) : [],
  };
};

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
