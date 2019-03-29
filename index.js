class Notifyme {
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
        if (e.target.classList.contains("notifyme-close")) {
          e.target.parentNode.remove();
        }
      });
    }
    getMessage(type, str) {
  
      this.closeAll();
  
      this.init();
  
      var notifyme = document.createElement("div");
      notifyme.classList.add("notifyme", type, this.ligh ? 'ligh' : false);
      this.positionX == 'center' ? (notifyme.style.right = '50%', notifyme.style.marginRight = '-125px') : (notifyme.style[this.positionX] = this.distanceX + "px");
      notifyme.style[this.positionY] = this.distanceY + "px";
      notifyme.style.zIndex = this.zIndex;
      notifyme.innerHTML = `
            <button class="notifyme-close"></button>
            <i class="notifyme-ico"></i>
            <div class="notifyme-content">${str}</div>`;
      setTimeout(() => {
        notifyme.remove();
      }, this.timeout);
      return notifyme;
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
      let array = document.querySelectorAll(".notifyme");
      array.forEach(function (item) {
        item.parentNode.removeChild(item);
      });
    }
  }
  
const notifyme = new Notifyme();

module.exports = { Notifyme }

export default notifyme