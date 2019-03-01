"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by linfengluo@gmail.com on 2019/2/28.
 */
var DEFAULT_INTERVAL = 1000;
var Touch = /** @class */ (function () {
    function Touch(el, callback, options) {
        this.startTime = 0;
        this.isHandleBack = false;
        this.options = {
            interval: DEFAULT_INTERVAL,
            autoHandle: true,
            isHideDefaultMenu: true,
        };
        this.timmer = null;
        this.callback = callback;
        this.options = Object.assign(this.options, options);
        el.addEventListener('touchstart', this.touchStart.bind(this));
        el.addEventListener('touchend', this.touchEnd.bind(this));
        el.addEventListener('mousedown', this.touchStart.bind(this));
        el.addEventListener('mouseout', this.handleCancel.bind(this));
        el.addEventListener('mouseup', this.touchEnd.bind(this));
        el.style.cursor = 'pointer';
        el.style.webkitUserSelect = 'none';
        //屏蔽长按菜单
        if (this.options.isHideDefaultMenu) {
            el.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            });
        }
    }
    Touch.prototype.handleCancel = function () {
        this.toggleStatus(true);
    };
    Touch.prototype.toggleStatus = function (status) {
        if (status === void 0) { status = false; }
        this.isHandleBack = status;
    };
    Touch.prototype.touchStart = function () {
        clearTimeout(this.timmer);
        this.toggleStatus();
        this.startTime = new Date().valueOf();
        if (this.options.autoHandle) {
            this.timmer = setTimeout(this.handleCallback.bind(this), this.options.interval);
        }
    };
    Touch.prototype.touchEnd = function () {
        this.isLongPress() && this.handleCallback();
    };
    Touch.prototype.isLongPress = function () {
        var endTime = new Date().valueOf();
        return (endTime - this.startTime) > this.options.interval;
    };
    Touch.prototype.handleCallback = function () {
        !this.isHandleBack && typeof this.callback === 'function' && this.callback();
        this.toggleStatus(true);
    };
    return Touch;
}());
exports.default = Touch;
