(function() {

  class Toastme {
      
    toastArray: IToastContent[];
    timeout: number;
    distanceX: number;
    distanceY: number;
    positionX: "left" | "right" | "center";
    positionY: "top" | "bottom";
    zIndex: number;
    ligh: boolean;
    theme: "default" | "light" | "dark" | "ligh";
    duplicates: boolean;
    animations: boolean;
    instanceId: string;
    
    constructor(config?: IToastConfig) {
        this.toastArray = [];
        this.timeout = config?.timeout || 5000;
        this.distanceX = config?.distanceX || 15;
        this.distanceY = config?.distanceY || 15;
        this.positionY = config?.positionY || "bottom";
        this.positionX = config?.positionX || "right";
        this.zIndex = config?.zIndex || 1000;
        this.ligh = config?.ligh || false;
        this.theme = config?.theme || "default";
        this.duplicates = config?.duplicates === false ? false : true;
        this.animations = config?.animations === false ? false : true;
        this.instanceId = "-" + Math.floor(Math.random() * 1000000 + 1);
    }

    initToast = () => {
        document.addEventListener("click", function(e: any) {
          if (e.target.classList.contains("toastme-close")) {
            e.target.parentNode.remove();
          }
        });
    };

    createToastList = (instanceId: string): HTMLElement => {
        const toastmeList = document.createElement("ul");
        toastmeList.classList.add("toastme-list");
        toastmeList.setAttribute("id", "toastmeList" + instanceId);
        this.positionX == "center"
          ? (toastmeList.style.right = "calc(50% - 125px)")
          : (toastmeList.style[this.positionX] = this.distanceX + "px");
        toastmeList.style[this.positionY] = this.distanceY + "px";
        toastmeList.style.zIndex = this.zIndex.toString();
        if (!document.getElementById("toastmeList" + instanceId)) {
          document.body.appendChild(toastmeList);
        }
        return toastmeList;
    };

    checkDuplicate = ({instanceId, str, type}: IToastContent): number => {
        return this.toastArray && this.toastArray.length && this.duplicates
          ? -1
          : this.toastArray.findIndex(
              toast =>
                toast.type == type &&
                toast.str == str &&
                toast.instanceId == instanceId
            );
    };

    destroyList = ({instanceId, str, type}: IToastContent): void => {
        if (
          document.getElementById("toastmeList" + instanceId) &&
          document
            .getElementById("toastmeList" + instanceId)
            .querySelectorAll("li").length === 0
        ) {
          document.getElementById("toastmeList" + instanceId).remove();
        }
  
        if (this.checkDuplicate({instanceId, str, type}) != -1) {
          this.toastArray.splice(this.checkDuplicate({instanceId, str, type}), 1);
        }
    };

    buildToast = ({instanceId, str, type}: IToastContent): HTMLElement => {
      
      this.initToast();
      
      const toastme: HTMLElement = document.createElement("li");
      
      toastme.classList.add(
        "toastme",
        type,
        this.theme ? this.theme : null,
        this.ligh ? "ligh" : null,
        this.animations === false ? null : "_anim"
      );

      toastme.innerHTML = `<button class="toastme-close"></button>
      <i class="toastme-ico"></i>
      <div class="toastme-content">${str}</div>`;

      setTimeout(() => {
        //toastme.classList.add("fade-out")
        toastme.remove();
        this.destroyList({instanceId, str, type});
      }, this.timeout);

      return toastme;
    };

    showToast = (type: ToastType, str: string): void => {
      const instanceId = this.instanceId;

      if (this.checkDuplicate({instanceId, str, type}) != -1)
        return;

      this.toastArray.push({ type, str, instanceId });

      this.createToastList(this.instanceId);

      document
        .getElementById("toastmeList" + this.instanceId)
        .appendChild(this.buildToast({type, str, instanceId: this.instanceId}));

    };

    default = (str: string): void => {
      this.showToast("default", str);
    };

    success = (str: string): void => {
      this.showToast("success", str);
    };

    error = (str: string): void => {
      this.showToast("error", str);
    };

    warning = (str: string): void => {
      this.showToast("warning", str);
    };

    info = (str: string): void => {
      this.showToast("info", str);
    };

    closeAll = () => {
      const array = document.querySelectorAll(".toastme-list");
      array.forEach(function(item) {
        item.parentNode.removeChild(item);
      });
    };
  }

  class Dialog {
    title: string;
    text: string;
    textConfirm: string;
    textCancel: string;
    showCancel: boolean;
    type?: DialogType;
    dark: boolean;
    animations: boolean;

    constructor(config?: IDialogConfig) {
      this.dark = config?.dark === true ? true : false;;
      this.animations = config?.animations === false ? false : true;
    }

    initDialog = (): void => {
      document.addEventListener("click", function(e: any) {
        if (e.target.classList.contains("--toastme-dialog-action")) {
          
          let array = document.querySelectorAll(".toastme-dialog-bg");

          array.forEach(function(item: any) {
            item.childNodes[1].classList.add("toastme-dialog-closing");
          });

          setTimeout(() => {
            let array = document.querySelectorAll(".toastme-dialog-bg");

            array.forEach(function(item) {
              //item.style.display = "none";
              item.classList.add("toastOut");
            });

          }, 400);

          setTimeout(() => {
            let array = document.querySelectorAll(".toastme-dialog-bg");
            array.forEach(function(item) {
              item.parentNode.removeChild(item);
            });
          }, 600);

        }
      });
    };

    buildDialog = ({title, text, showCancel, textCancel, textConfirm, type }: IDialogParams): HTMLElement => {
      var showTitle = title
        ? `<p class="toastme-dialog-title">${title}</p>`
        : "";
      var showText = text ? `<p class="toastme-dialog-text">${text}</p>` : "";
      var showType = this.selectType(type);
      var btnCancel = showCancel
        ? `<button id="toastmeCancel" class="btn-toastme --toastme-dialog-action --toastme-cancel">${textCancel ||
            "Cancel"}</button>`
        : "";
      var dialog = document.createElement("div");
      dialog.setAttribute("id", "toastme-dialog-bg");
      dialog.classList.add("toastme-dialog-bg", "--toastme-dialog-action");
      dialog.innerHTML = `
      <div class="toastme-dialog ${this.dark ? "dark" : ""}">
          <div class="toastme-dialog-content">
              ${showType} ${showTitle} ${showText}
        <div class="toastme-diag-actions">
          <button id="toastmeConfirm" class="btn-toastme --toastme-dialog-action --toastme-confirm">${textConfirm ||
            "Confirm"}</button>
                  ${btnCancel}
        </div>
          </div>
      </div>`;
      return dialog;
    };

    selectType = (type?: DialogType): HTMLElement | string => {
      if (!type) return "";
      return `<div class="toastme-dialog-ico ${type} ${this.animations ? '_anim': ''}"></div>`;
    };

    closeAllDialogs = () => {
      const array = document.querySelectorAll(".toastme-dialog-bg");
      array.forEach(function(item: any) {
        item.style.display = "none";
        item.parentNode.removeChild(item);
      });
    };

    show = ({title, text, showCancel, textCancel, textConfirm, type }: IDialogParams) => {
      
      this.closeAllDialogs();
      
      this.initDialog();
      
      document.body.appendChild(this.buildDialog({title, text, showCancel, textCancel, textConfirm, type }));

      return new Promise(function(resolve) {
        
        document.getElementById("toastmeConfirm").addEventListener("click", function() {
          resolve(true);
        });
        
        const btnCancel = document.getElementById("toastmeCancel");
        
        if (btnCancel) {
          btnCancel.addEventListener("click", function() {
            resolve(false);
          });
        }

      });
    };

  }

  interface IToastContent {
    type: ToastType;
    str: string;
    instanceId: string;
  }

  interface IToastConfig {
    timeout?:    number;
    positionY?:  'bottom' | 'top';
    positionX?:  'right' | 'left' | 'center';
    distanceY?:  number;
    distanceX?:  number;
    zIndex?:     number;
    theme?:      'light' | 'dark' | 'ligh' | 'default';
    duplicates?: boolean;
    animations?: boolean;
    ligh?: boolean;
  }
  
  type ToastType = "success" | "info" | "warning" | "error" | "default";
  interface IDialogConfig {
    dark?: boolean;
    animations?: boolean;
  }
  interface IDialogParams {
    title?: string;
    text?: string;
    textConfirm?: string;
    textCancel?: string;
    showCancel?: boolean;
    type?: 'success' | 'danger' | 'warning' | 'info' | 'question';
  }

  type DialogType = "success" | "danger" | "warning" | "info" | "question";

  const toastme = new Toastme();

  const dialog = new Dialog();

  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
      module.exports = {
        Toastme,
        toastme,
        Dialog,
        dialog
      };
      //module.exports = toastme;
      //module.exports = dialog;
      //exports.toastme = toastme;

  } else {
      window['toastme'] = toastme;
      window['Toastme'] = Toastme;
      window['dialog'] = dialog;
      window['Dialog'] = Dialog;
  }
})();