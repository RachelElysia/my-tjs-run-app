"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickyOut = exports.StickyIn = exports.Sticky = void 0;
var environment_1 = __importDefault(require("../utils/environment"));
var Sticky = function (left, top) {
    if (left === void 0) { left = 50; }
    if (top === void 0) { top = 50; }
    return ({
        in: {
            style: {
                left: function () { return (left * environment_1.default.width) / 100 + "px"; },
                top: function () { return (top * environment_1.default.height) / 100 + "px"; },
                transform: "translate(-50%, -50%)",
                position: "fixed",
            },
        },
        out: {
            style: {
                left: function () { return (left * environment_1.default.width) / 100 + "px"; },
                top: function () { return (top * environment_1.default.height) / 100 + "px"; },
                transform: "translate(-50%, -50%)",
                position: "fixed",
            },
        },
    });
};
exports.Sticky = Sticky;
var StickyIn = function (left, top) {
    if (left === void 0) { left = 50; }
    if (top === void 0) { top = 50; }
    return ({
        in: {
            style: {
                left: function () { return (left * environment_1.default.width) / 100 + "px"; },
                top: function () { return (top * environment_1.default.height) / 100 + "px"; },
                transform: "translate(-50%, -50%)",
                position: "fixed",
            },
        },
        out: {
            style: {
                left: function () { return (left * environment_1.default.width) / 100 + "px"; },
                top: function () { return (top * environment_1.default.height) / 100 + "px"; },
                transform: "translate(-50%, -50%)",
                position: "absolute",
            },
        },
    });
};
exports.StickyIn = StickyIn;
var StickyOut = function (left, top) {
    if (left === void 0) { left = 50; }
    if (top === void 0) { top = 50; }
    return ({
        in: {
            style: {
                left: (left * environment_1.default.width) / 100 + "px",
                top: (top * environment_1.default.height) / 100 + "px",
                transform: "translate(-50%, -50%)",
                position: "absolute",
            },
        },
        out: {
            style: {
                left: (left * environment_1.default.width) / 100 + "px",
                top: (top * environment_1.default.height) / 100 + "px",
                transform: "translate(-50%, -50%)",
                position: "fixed",
            },
        },
    });
};
exports.StickyOut = StickyOut;
