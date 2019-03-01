"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by linfengluo@gmail.com  on 2019/2/28.
 */
var touch_1 = require("./touch");
exports.default = {
    install: function (Vue, options) {
        if (options === void 0) { options = {}; }
        Vue.directive('longPress', {
            inserted: function (el, binding) {
                new touch_1.default(el, binding.value, options);
            }
        });
    }
};
