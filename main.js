var animate = require('./animate');
var ctx = require('./ctx')();
var keydown = require('./keydown');

var clearBackground = function() {
  ctx.fillStyle = "gray";
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
