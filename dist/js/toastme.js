"use strict";

/*!
 * toastmejs v1.2.4
 * Web notifications and dialogs with pure javascript
 * (c) 2021 alexsegen | Twitter https://twitter.com/pixelagil 
 * MIT License
 * git+https://github.com/alexsegen/toastmejs.git
 */

(function () {
  function Toastme() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      timeout: null,
      distanceX: null,
      distanceY: null,
      positionY: null,
      positionX: null,
      zIndex: null,
      ligh: false,
      theme: "",
      duplicates: false
    };

    debugger;
    this.toastArray = [];
    this.timeout = config.timeout || 5000;
    this.distanceX = config.distanceX || 15;
    this.distanceY = config.distanceY || 15;
    this.positionY = config.positionY || "bottom"; //bottom, top
    this.positionX = config.positionX || "right"; //right, left, center
    this.zIndex = config.zIndex || 1000;
    this.ligh = config.ligh;
    this.theme = config.theme || "";
    this.duplicates = config.duplicates;
    this.animations = config.animations;
    this.instanceId = "-" + Math.floor(Math.random() * 1000000 + 1);

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
      this.positionX == "center" ? toastmeList.style.right = "calc(50% - 125px)" : toastmeList.style[this.positionX] = this.distanceX + "px";
      toastmeList.style[this.positionY] = this.distanceY + "px";
      toastmeList.style.zIndex = this.zIndex;
      if (!document.getElementById("toastmeList" + instanceId)) {
        document.body.appendChild(toastmeList);
      }
      return toastmeList;
    };

    this.checkDuplicate = function (instanceId, str, type) {
      return this.duplicates ? -1 : this.toastArray.findIndex((function (toast) {
        return toast.type == type && toast.str == str && toast.instanceId == instanceId;
      }));
    };

    this.destroyList = function (instanceId, str, type) {
      if (document.getElementById("toastmeList" + instanceId) && document.getElementById("toastmeList" + instanceId).querySelectorAll("li").length == 0) {
        document.getElementById("toastmeList" + instanceId).remove();
      }

      if (this.checkDuplicate(instanceId, str, type) != -1) {
        this.toastArray.splice(this.checkDuplicate(instanceId, str, type), 1);
      }
    };

    this.buildToast = function (type, str, instanceId) {
      var _this = this;

      this.initToast();
      var toastme = document.createElement("li");
      toastme.classList.add("toastme", type, this.theme ? this.theme : false, this.ligh ? "ligh" : false, this.animations === false ? null : "_anim");
      toastme.innerHTML = "\n          <button class=\"toastme-close\"></button>\n          <i class=\"toastme-ico\"></i>\n          <div class=\"toastme-content\">" + str + "</div>";

      setTimeout((function () {
        //toastme.classList.add("fade-out")
        toastme.remove();
        _this.destroyList(instanceId, str, type);
      }), this.timeout);

      return toastme;
    };

    this.showToast = function (type, str) {
      var instanceId = this.instanceId;

      if (this.checkDuplicate(instanceId, str, type) != -1) {
        return false;
      }

      this.toastArray.push({ type: type, str: str, instanceId: instanceId });

      this.createToastList(this.instanceId);
      document.getElementById("toastmeList" + this.instanceId).appendChild(this.buildToast(type, str, this.instanceId));
    };
    this.default = function (str) {
      this.showToast("default", str);
    };
    this.success = function (str) {
      this.showToast("success", str);
    };
    this.error = function (str) {
      this.showToast("error", str);
    };
    this.warning = function (str) {
      this.showToast("warning", str);
    };
    this.info = function (str) {
      this.showToast("info", str);
    };

    //Toastme Dialogs

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
              //item.style.display = "none";
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

    this.buildDialog = function (title, text) {
      var textConfirm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Confirm";
      var textCancel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Cancel";
      var showCancel = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var type = arguments[5];
      var dark = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var animations = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : true;

      var showTitle = title ? "<p class=\"toastme-dialog-title\">" + title + "</p>" : "";
      var showText = text ? "<p class=\"toastme-dialog-text\">" + text + "</p>" : "";
      var showType = this.selectType(type, animations) ? this.selectType(type, animations) : "";
      var btnCancel = showCancel ? "<button id=\"toastmeCancel\" class=\"btn-toastme --toastme-dialog-action --toastme-cancel\">" + (textCancel || "Cancel") + "</button>" : "";
      var dialog = document.createElement("div");
      dialog.setAttribute("id", "toastme-dialog-bg");
      dialog.classList.add("toastme-dialog-bg", "--toastme-dialog-action");
      dialog.innerHTML = "\n      <div class=\"toastme-dialog " + (dark ? "dark" : "") + "\">\n          <div class=\"toastme-dialog-content\">\n              " + showType + " " + showTitle + " " + showText + "\n        <div class=\"toastme-diag-actions\">\n          <button id=\"toastmeConfirm\" class=\"btn-toastme --toastme-dialog-action --toastme-confirm\">" + (textConfirm || "Confirm") + "</button>\n                  " + btnCancel + "\n        </div>\n          </div>\n      </div>";
      return dialog;
    };

    this.selectType = function (str, animations) {
      switch (str) {
        case "danger":
          return "<div class=\"toastme-dialog-ico danger " + (animations ? '_anim' : '') + "\"></div>";
        case "success":
          return "<div class=\"toastme-dialog-ico success " + (animations ? '_anim' : '') + "\"></div>";
        case "info":
          return "<div class=\"toastme-dialog-ico info " + (animations ? '_anim' : '') + "\"></div>";
        case "warning":
          return "<div class=\"toastme-dialog-ico warning " + (animations ? '_anim' : '') + "\"></div>";
        case "question":
          return "<div class=\"toastme-dialog-ico question " + (animations ? '_anim' : '') + "\"></div>";
        default:
          return false;
      }
    };

    this.yesNoDialog = function () {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        title: null,
        text: null,
        textConfirm: "Confirmar" || "Confirm",
        textCancel: "" || "Cancel",
        showCancel: true,
        type: null || null,
        dark: false,
        animations: true
      };

      this.closeAllDialogs();
      this.initDialog();
      document.body.appendChild(this.buildDialog(config.title, config.text, config.textConfirm, config.textCancel, config.showCancel, config.type, config.dark, config.animations));

      return new Promise(function (resolve, reject) {
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

    this.closeAllToasts = function () {
      var array = document.querySelectorAll(".toastme-list");
      array.forEach((function (item) {
        item.parentNode.removeChild(item);
      }));
    };

    this.closeAllDialogs = function () {
      var array = document.querySelectorAll(".toastme-dialog-bg");
      array.forEach((function (item) {
        item.style.display = "none";
        item.parentNode.removeChild(item);
      }));
    };
  }

  var toastme = new Toastme();

  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = {
      Toastme: Toastme,
      toastme: toastme
    };
    module.exports = toastme;
  } else {
    window.toastme = toastme;
    window.Toastme = Toastme;
  }
})();