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
    init() {
      document.addEventListener("click", function (e) {
        if (e.target.classList.contains("toastme-close")) {
          e.target.parentNode.remove();
        }
      });
    }
    getMessage(type, str) {
  
      this.closeAll();
  
      this.init();
  
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
    closeAll() {
      let array = document.querySelectorAll(".toastme");
      array.forEach(function (item) {
        item.parentNode.removeChild(item);
      });
    }
  }
  
const toastme = new Toastme();

module.exports = { Toastme }

export default toastme