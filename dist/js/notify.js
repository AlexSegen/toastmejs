class Notify {
  constructor(
    config = {
      timeout: null,
      distanceX: null,
      distanceY: null,
      positionY: null,
      positionX: null,
      zIndex: null,
      light: false
    }
  ) {
    this.timeout = config.timeout || 5000;
    this.distanceX = config.distanceX || 15;
    this.distanceY = config.distanceY || 15;
    this.positionY = config.positionY || "bottom";
    this.positionX = config.positionX || "right"; //right, left, center
    this.zIndex = config.zIndex || 100;
    this.light = config.light || false;
  }
  init() {
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("notify-close")) {
        e.target.parentNode.remove();
      }
    });
  }
  getMessage(type, str) {

    this.closeAll();

    this.init();

    var notify = document.createElement("div");
    notify.classList.add("notify", type, this.light ? 'light' : false);
    this.positionX == 'center' ? (notify.style.right = '50%', notify.style.marginRight = '-125px') : (notify.style[this.positionX] = this.distanceX + "px");
    //notify.style[this.positionX] = this.distanceX + "px";
    notify.style[this.positionY] = this.distanceY + "px";
    notify.style.zIndex = this.zIndex;
    notify.innerHTML = `
          <button class="notify-close"></button>
          <i class="notify-ico"></i>
          <div class="notify-content">${str}</div>`;
    setTimeout(() => {
      notify.remove();
    }, this.timeout);
    return notify;
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
  closeAll() {
    let array = document.querySelectorAll(".notify");
    array.forEach(function (item) {
      item.parentNode.removeChild(item);
    });
  }
}

const notify = new Notify();