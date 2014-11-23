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
