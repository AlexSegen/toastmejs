var Toastme = function (config = {
  timeout: null,
  distanceX: null,
  distanceY: null,
  positionY: null,
  positionX: null,
  zIndex: null,
  ligh: false
}) {

  this.timeout = config.timeout || 5000;
  this.distanceX = config.distanceX || 15;
  this.distanceY = config.distanceY || 15;
  this.positionY = config.positionY || "bottom";
  this.positionX = config.positionX || "right"; //right, left, center
  this.zIndex = config.zIndex || 100;
  this.ligh = config.ligh || false;

  this.init = function () {
      document.addEventListener("click", function (e) {
        if (e.target.classList.contains("toastme-close")) {
          e.target.parentNode.remove();
        }
      });
    },

    this.getMessage = function (type, str) {

      this.closeAll();

      this.init();

      var toastme = document.createElement("div");
      toastme.setAttribute('id', 'toastme');
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
  this.success = function (str) {
    document.body.appendChild(this.getMessage("success", str));
  };
  this.error = function (str) {
    document.body.appendChild(this.getMessage("error", str));
  };
  this.warning = function (str) {
    document.body.appendChild(this.getMessage("warning", str));
  };
  this.info = function (str) {
    document.body.appendChild(this.getMessage("info", str));
  };
  this.closeAll = function () {
    var toastme = document.getElementById('toastme')
    if (toastme) toastme.parentNode.removeChild(toastme);
  };
}

const toastme = new Toastme();

module.exports.Toastme = Toastme

module.exports.toastme = toastme
