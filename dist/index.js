"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TAGS = exports.render = exports.h = exports.DocType = void 0;
exports.DocType = __importStar(require("./doctype"));
var h_1 = require("./h");
Object.defineProperty(exports, "h", { enumerable: true, get: function () { return h_1.h; } });
var renderer_1 = require("./renderer");
Object.defineProperty(exports, "render", { enumerable: true, get: function () { return renderer_1.render; } });
var tags_1 = require("./tags");
Object.defineProperty(exports, "TAGS", { enumerable: true, get: function () { return tags_1.TAGS; } });
//# sourceMappingURL=index.js.map