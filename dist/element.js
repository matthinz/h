"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.element = void 0;
const types_1 = require("./types");
function element(tagName, properties, children) {
    return {
        [types_1.NodeTypeSymbol]: types_1.NODE_TYPE_ELEMENT,
        tagName,
        properties: normalizeProperties(properties),
        children: children ? children.filter(Boolean) : [],
    };
}
exports.element = element;
function normalizeProperties(properties) {
    if (properties == null) {
        return {};
    }
    return Object.keys(properties).reduce((result, key) => {
        expandValues(key, properties[key]).forEach(({ key, value }) => {
            result[key] = value;
        });
        return result;
    }, {});
}
function expandValues(key, value) {
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
                        const ok = value[className];
                        return ok;
                    })
                        .join(" "),
                },
            ];
        }
        return Object.keys(value).reduce((result, subkey) => {
            expandValues(subkey, value[subkey]).forEach((attr) => {
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
//# sourceMappingURL=element.js.map