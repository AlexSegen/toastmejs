"use strict";

/*!
 * toastmejs v1.2.4
 * Web notifications and dialogs with pure javascript
 * (c) 2021 alexsegen | Twitter https://twitter.com/pixelagil 
 * MIT License
 * git+https://github.com/alexsegen/toastmejs.git
 */

(function () {
    var Toastme = (function () {
        function Toastme(config) {
            var _this = this;
            this.initToast = function () {
                document.addEventListener("click", (function (e) {
                    if (e.target.classList.contains("toastme-close")) {
                        e.target.parentNode.remove();
                    }
                }));
            };
            this.createToastList = function (instanceId) {
                var toastmeList = document.createElement("ul");
                toastmeList.classList.add("toastme-list");
                toastmeList.setAttribute("id", "toastmeList" + instanceId);
                _this.positionX == "center" ? toastmeList.style.right = "calc(50% - 125px)" : toastmeList.style[_this.positionX] = _this.distanceX + "px";
                toastmeList.style[_this.positionY] = _this.distanceY + "px";
                toastmeList.style.zIndex = _this.zIndex.toString();
                if (!document.getElementById("toastmeList" + instanceId)) {
                    document.body.appendChild(toastmeList);
                }
                return toastmeList;
            };
            this.checkDuplicate = function (_a) {
                var instanceId = _a.instanceId,
                    str = _a.str,
                    type = _a.type;
                return _this.toastArray && _this.toastArray.length && _this.duplicates ? -1 : _this.toastArray.findIndex((function (toast) {
                    return toast.type == type && toast.str == str && toast.instanceId == instanceId;
                }));
            };
            this.destroyList = function (_a) {
                var instanceId = _a.instanceId,
                    str = _a.str,
                    type = _a.type;
                if (document.getElementById("toastmeList" + instanceId) && document.getElementById("toastmeList" + instanceId).querySelectorAll("li").length === 0) {
                    document.getElementById("toastmeList" + instanceId).remove();
                }
                if (_this.checkDuplicate({ instanceId: instanceId, str: str, type: type }) != -1) {
                    _this.toastArray.splice(_this.checkDuplicate({ instanceId: instanceId, str: str, type: type }), 1);
                }
            };
            this.buildToast = function (_a) {
                var instanceId = _a.instanceId,
                    str = _a.str,
                    type = _a.type;
                _this.initToast();
                var toastme = document.createElement("li");
                toastme.classList.add("toastme", type, _this.theme ? _this.theme : null, _this.ligh ? "ligh" : null, _this.animations === false ? null : "_anim");
                toastme.innerHTML = "<button class=\"toastme-close\"></button>\n      <i class=\"toastme-ico\"></i>\n      <div class=\"toastme-content\">" + str + "</div>";
                setTimeout((function () {
                    toastme.remove();
                    _this.destroyList({ instanceId: instanceId, str: str, type: type });
                }), _this.timeout);
                return toastme;
            };
            this.showToast = function (type, str) {
                var instanceId = _this.instanceId;
                if (_this.checkDuplicate({ instanceId: instanceId, str: str, type: type }) != -1) return;
                _this.toastArray.push({ type: type, str: str, instanceId: instanceId });
                _this.createToastList(_this.instanceId);
                document.getElementById("toastmeList" + _this.instanceId).appendChild(_this.buildToast({ type: type, str: str, instanceId: _this.instanceId }));
            };
            this.default = function (str) {
                _this.showToast("default", str);
            };
            this.success = function (str) {
                _this.showToast("success", str);
            };
            this.error = function (str) {
                _this.showToast("error", str);
            };
            this.warning = function (str) {
                _this.showToast("warning", str);
            };
            this.info = function (str) {
                _this.showToast("info", str);
            };
            this.closeAll = function () {
                var array = document.querySelectorAll(".toastme-list");
                array.forEach((function (item) {
                    item.parentNode.removeChild(item);
                }));
            };
            this.toastArray = [];
            this.timeout = (config === null || config === void 0 ? void 0 : config.timeout) || 5000;
            this.distanceX = (config === null || config === void 0 ? void 0 : config.distanceX) || 15;
            this.distanceY = (config === null || config === void 0 ? void 0 : config.distanceY) || 15;
            this.positionY = (config === null || config === void 0 ? void 0 : config.positionY) || "bottom";
            this.positionX = (config === null || config === void 0 ? void 0 : config.positionX) || "right";
            this.zIndex = (config === null || config === void 0 ? void 0 : config.zIndex) || 1000;
            this.ligh = (config === null || config === void 0 ? void 0 : config.ligh) || false;
            this.theme = (config === null || config === void 0 ? void 0 : config.theme) || "default";
            this.duplicates = (config === null || config === void 0 ? void 0 : config.duplicates) === false ? false : true;
            this.animations = (config === null || config === void 0 ? void 0 : config.animations) === false ? false : true;
            this.instanceId = "-" + Math.floor(Math.random() * 1000000 + 1);
        }
        return Toastme;
    })();
    var Dialog = (function () {
        function Dialog(config) {
            var _this = this;
            this.initDialog = function () {
                document.addEventListener("click", (function (e) {
                    if (e.target.classList.contains("--toastme-dialog-action")) {
                        var array = document.querySelectorAll(".toastme-dialog-bg");
                        array.forEach((function (item) {
                            item.childNodes[1].classList.add("toastme-dialog-closing");
                        }));
                        setTimeout((function () {
                            var array = document.querySelectorAll(".toastme-dialog-bg");
                            array.forEach((function (item) {
                                item.classList.add("toastOut");
                            }));
                        }), 400);
                        setTimeout((function () {
                            var array = document.querySelectorAll(".toastme-dialog-bg");
                            array.forEach((function (item) {
                                item.parentNode.removeChild(item);
                            }));
                        }), 600);
                    }
                }));
            };
            this.buildDialog = function (_a) {
                var title = _a.title,
                    text = _a.text,
                    showCancel = _a.showCancel,
                    textCancel = _a.textCancel,
                    textConfirm = _a.textConfirm,
                    type = _a.type;
                var showTitle = title ? "<p class=\"toastme-dialog-title\">" + title + "</p>" : "";
                var showText = text ? "<p class=\"toastme-dialog-text\">" + text + "</p>" : "";
                var showType = _this.selectType(type);
                var btnCancel = showCancel ? "<button id=\"toastmeCancel\" class=\"btn-toastme --toastme-dialog-action --toastme-cancel\">" + (textCancel || "Cancel") + "</button>" : "";
                var dialog = document.createElement("div");
                dialog.setAttribute("id", "toastme-dialog-bg");
                dialog.classList.add("toastme-dialog-bg", "--toastme-dialog-action");
                dialog.innerHTML = "\n      <div class=\"toastme-dialog " + (_this.dark ? "dark" : "") + "\">\n          <div class=\"toastme-dialog-content\">\n              " + showType + " " + showTitle + " " + showText + "\n        <div class=\"toastme-diag-actions\">\n          <button id=\"toastmeConfirm\" class=\"btn-toastme --toastme-dialog-action --toastme-confirm\">" + (textConfirm || "Confirm") + "</button>\n                  " + btnCancel + "\n        </div>\n          </div>\n      </div>";
                return dialog;
            };
            this.selectType = function (type) {
                if (!type) return "";
                return "<div class=\"toastme-dialog-ico " + type + " " + (_this.animations ? '_anim' : '') + "\"></div>";
            };
            this.closeAllDialogs = function () {
                var array = document.querySelectorAll(".toastme-dialog-bg");
                array.forEach((function (item) {
                    item.style.display = "none";
                    item.parentNode.removeChild(item);
                }));
            };
            this.show = function (_a) {
                var title = _a.title,
                    text = _a.text,
                    showCancel = _a.showCancel,
                    textCancel = _a.textCancel,
                    textConfirm = _a.textConfirm,
                    type = _a.type;
                _this.closeAllDialogs();
                _this.initDialog();
                document.body.appendChild(_this.buildDialog({ title: title, text: text, showCancel: showCancel, textCancel: textCancel, textConfirm: textConfirm, type: type }));
                return new Promise(function (resolve) {
                    document.getElementById("toastmeConfirm").addEventListener("click", (function () {
                        resolve(true);
                    }));
                    var btnCancel = document.getElementById("toastmeCancel");
                    if (btnCancel) {
                        btnCancel.addEventListener("click", (function () {
                            resolve(false);
                        }));
                    }
                });
            };
            this.dark = (config === null || config === void 0 ? void 0 : config.dark) === true ? true : false;
            ;
            this.animations = (config === null || config === void 0 ? void 0 : config.animations) === false ? false : true;
        }
        return Dialog;
    })();
    var toastme = new Toastme();
    var dialog = new Dialog();
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = {
            Toastme: Toastme,
            toastme: toastme,
            Dialog: Dialog,
            dialog: dialog
        };
    } else {
        window['toastme'] = toastme;
        window['Toastme'] = Toastme;
        window['dialog'] = dialog;
        window['Dialog'] = Dialog;
    }
})();