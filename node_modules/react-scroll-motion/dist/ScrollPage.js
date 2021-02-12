"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var react_1 = __importStar(require("react"));
var ScrollContext_1 = require("./ScrollContext");
var ScrollPage = function (_a) {
    var children = _a.children, page = _a.page, _b = _a.debugBorder, debugBorder = _b === void 0 ? false : _b;
    var viewportHeight = react_1.useContext(ScrollContext_1.ScrollContainerContext).viewportHeight;
    var style = __assign({ margin: 0, padding: 0, height: viewportHeight, position: "relative", boxSizing: "border-box", scrollSnapAlign: "center", overflow: "hidden" }, (debugBorder ? { border: "1px solid red" } : {}));
    return (react_1.default.createElement("div", { style: style },
        react_1.default.createElement(ScrollContext_1.ScrollPageContext.Provider, { value: { page: page } }, children)));
};
exports.default = ScrollPage;
