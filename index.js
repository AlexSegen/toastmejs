class Toastme {
  constructor(
    config = {
      timeout: null,
      distanceX: null,
      distanceY: null,
      positionY: null,
      positionX: null,
      zIndex: null,
      ligh: false
    }
  ) {
    this.timeout = config.timeout || 5000;
    this.distanceX = config.distanceX || 15;
    this.distanceY = config.distanceY || 15;
    this.positionY = config.positionY || "bottom";
    this.positionX = config.positionX || "right"; //right, left, center
    this.zIndex = config.zIndex || 100;
    this.ligh = config.ligh || false;
  }
  initToast() {

    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("toastme-close")) {
        e.target.parentNode.remove();
      }
    });
  }
  initDialog() {
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("--toastme-dialog-action")) {
        let array = document.querySelectorAll(".toastme-dialog-bg");
        array.forEach(function (item) {
          item.childNodes[1].classList.add("toastme-dialog-closing");
        });
        setTimeout(() => {
          let array = document.querySelectorAll(".toastme-dialog-bg");
          array.forEach(function (item) {
            item.style.display = "none";
            item.parentNode.removeChild(item);
          });
        }, 500);
      }
    });
  }
  getMessage(type, str) {

    this.closeAllToasts();

    this.initToast();

    var toastme = document.createElement("div");
    toastme.classList.add("toastme", type, this.ligh ? 'ligh' : false);
    this.positionX == 'center' ? (toastme.style.right = '50%', toastme.style.marginRight = '-125px') : (toastme.style[this.positionX] = this.distanceX + "px");
    toastme.style[this.positionY] = this.distanceY + "px";
    toastme.style.zIndex = this.zIndex;
    toastme.innerHTML = `
          <button class="toastme-close"></button>
          <i class="toastme-ico"></i>
          <div class="toastme-content">${str}</div>`;
    setTimeout(() => {
      toastme.remove();
    }, this.timeout);
    return toastme;
  }
  success(str) {
    document.body.appendChild(this.getMessage("success", str));
  }
  error(str) {
    document.body.appendChild(this.getMessage("error", str));
  }
  warning(str) {
    document.body.appendChild(this.getMessage("warning", str));
  }
  info(str) {
    document.body.appendChild(this.getMessage("info", str));
  }

  //Toastme Dialog 
  buildDialog(title, text, textConfirm, textCancel, showCancel, type) {
    var showTitle = title ? `<p class="toastme-dialog-title">${title}</p>` : "";
    var showText = text ? `<p class="toastme-dialog-text">${text}</p>` : "";
    var showType = this.selectType(type) ? this.selectType(type) : "";
    var btnCancel = showCancel ?
      `<button id="toastmeCancel" class="--toastme-dialog-action --toastme-cancel">${textCancel}</button>` :
      "";
    var dialog = document.createElement("div");
    dialog.setAttribute("id", "toastme-dialog-bg");
    dialog.classList.add("toastme-dialog-bg", "--toastme-dialog-action");
    dialog.innerHTML = `
    <div class="toastme-dialog">
        <div class="toastme-dialog-content">
            ${showType} ${showTitle} ${showText}
			<div class="toastme-diag-actions">
				<button id="toastmeConfirm" class="--toastme-dialog-action --toastme-confirm">${textConfirm}</button>
                ${btnCancel}
			</div>
        </div>
    </div>`;
    return dialog;
  }
  selectType(str) {
    switch (str) {
      case "danger":
        return `<div class="toastme-dialog-ico danger"></div>`;
      case "success":
        return `<div class="toastme-dialog-ico success"></div>`;
      case "info":
        return `<div class="toastme-dialog-ico info"></div>`;
      case "warning":
        return `<div class="toastme-dialog-ico warning"></div>`;
      default:
        return false;
    }
  }
  yesNoDialog(
    config = {
      title: null,
      text: null,
      textConfirm: "Confirmar" || "Confirm",
      textCancel: "" || "Cancel",
      showCancel: true,
      type: null || null
    }
  ) {
    this.closeAllDialogs();
    this.initDialog();
    document.body.appendChild(
      this.buildDialog(
        config.title,
        config.text,
        config.textConfirm,
        config.textCancel,
        config.showCancel,
        config.type
      )
    );

    var yesNoDialog = new Promise(function (resolve, reject) {
      document
        .getElementById("toastmeConfirm")
        .addEventListener("click", function () {
          resolve(true);
        });
      document
        .getElementById("toastmeCancel")
        .addEventListener("click", function () {
          resolve(false);
        });
    });
    return yesNoDialog;
  }

  closeAllToasts() {
    let array = document.querySelectorAll(".toastme");
    array.forEach(function (item) {
      item.parentNode.removeChild(item);
    });
  }

  closeAllDialogs() {
    let array = document.querySelectorAll(".toastme-dialog-bg");
    array.forEach(function (item) {
      item.style.display = "none";
      item.parentNode.removeChild(item);
    });
  }
}

const toastme = new Toastme();

module.exports = toastme