var ctx = null;

module.exports = function(resX, resY) {
  if (ctx === null) {
    var canvas = document.createElement("canvas")

    canvas.width = resX || 1024;
    canvas.height = resY || 600;

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    canvas.style.position = "absolute";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.overflow = "hidden";

    document.body.appendChild(canvas)
    ctx = canvas.getContext("2d");
  }

  return ctx;
}
