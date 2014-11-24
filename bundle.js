(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(drawFunc) {
  (function raf() {
    drawFunc();
    window.requestAnimationFrame(raf);
  })();
}

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
var keyCodes = {"left": 37, "right": 39};
var callbacks = {};

var keyDownListener = null;

module.exports = function(key, cb) {
  var code = keyCodes[key] || key;
  callbacks[code] = cb;

  if (keyDownListener === null) {
    keyDownListener = function(evt) {
      console.log(evt.keyCode);
      console.log(callbacks)
      var cb = callbacks[evt.keyCode] || callbacks[evt.charCode];
      if (cb) cb();
    }
    window.addEventListener('keydown',keyDownListener,true);
  }
}

},{}],4:[function(require,module,exports){
var animate = require('./animate');
var ctx = require('./ctx')();
var keydown = require('./keydown');

var clearBackground = function() {
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

var rect = {
  height: 50,
  width: 50,
  centeredX: function() {return ctx.canvas.width/2 - this.width/2;},
  centeredY: function() {return ctx.canvas.height/2 - this.height/2;},
  draw: function(x, y) { ctx.fillRect(x, y,  this.width, this.height);},
  grow: 4,
  expand: 1
}

var draw = function() {
  clearBackground();

  if (rect.width < 20 || rect.width > ctx.canvas.height/2)
    rect.expand = -rect.expand;

  rect.width += rect.grow*rect.expand;
  rect.height += rect.grow*rect.expand;

  ctx.fillStyle = "red";
  rect.draw(rect.centeredX(), rect.centeredY());

  ctx.textAlign = "center";
  ctx.fillStyle = "black"
  ctx.font="50px Helvetica";
  var text = "expansion rate: " + rect.grow.toFixed(2);
  ctx.fillText(text,ctx.canvas.width/2,ctx.canvas.height-10);
}

keydown('right', function() {
  rect.grow += 0.2;
})

keydown('left', function() {
  rect.grow -= 0.2;
})

animate(draw);

},{"./animate":1,"./ctx":2,"./keydown":3}]},{},[4]);
