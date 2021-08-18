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

  const toastme = new Toastme();

  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
      module.exports = {
      Toastme,
      toastme
      };
      module.exports = toastme;
  } else {
      window['toastme'] = toastme;
      window['Toastme'] = Toastme;
  }
})();