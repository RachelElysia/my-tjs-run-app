"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isIphone = /iPhone/.test(navigator.userAgent);
var isSafari = /Safari/.test(navigator.userAgent);
var environment = new Proxy({ width: 0, height: 0 }, {
    get: function (target, key) {
        if (key === "height") {
            if (isIphone && isSafari)
                return window.screen.height - 80;
            return window.innerHeight;
        }
        if (key === "width") {
            if (isIphone && isSafari)
                return window.screen.width;
            return window.innerWidth;
        }
        return undefined;
    }
});
exports.default = environment;
