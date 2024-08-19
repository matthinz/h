"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.h = void 0;
const types_1 = require("./types");
const h = (tagName, propertiesOrChildOrChildren, maybeChildren) => {
    let properties;
    let children;
    if (propertiesOrChildOrChildren == null) {
        children = [];
    }
    else if ((0, types_1.isNode)(propertiesOrChildOrChildren)) {
        children = Array.isArray(propertiesOrChildOrChildren)
            ? propertiesOrChildOrChildren
            : [propertiesOrChildOrChildren];
    }
    else {
        properties = propertiesOrChildOrChildren;
        if (maybeChildren == null) {
            children = [];
        }
        else {
            children = Array.isArray(maybeChildren) ? maybeChildren : [maybeChildren];
        }
    }
    return {
        tagName,
        properties: normalizeProperties(properties),
        children: children ? children.filter(Boolean) : [],
    };
};
exports.h = h;
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
