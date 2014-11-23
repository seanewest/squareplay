module.exports = function(drawFunc) {
  (function raf() {
    drawFunc();
    window.requestAnimationFrame(raf);
  })();
}
