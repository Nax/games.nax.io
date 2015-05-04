function Eve (x, y) {
  this.pos = {x: x, y: y};
  this.mov = {x: 0, y: 0};
  this.size = 10;
}

Eve.prototype.update = function () {
  var t = evo.target;
  var dx = t.x - this.pos.x;
  var dy = t.y - this.pos.y;
  var len = Math.sqrt(dx * dx + dy * dy);
  var coeff = len > 100.0 ? 1 : len / 100.0;

  this.mov.x *= 0.9;
  this.mov.y *= 0.9;
  if (len >= 0.001) {
    this.mov.x += dx / len * coeff;
    this.mov.y += dy / len * coeff;
  }
  this.pos.x += this.mov.x;
  this.pos.y += this.mov.y;
}

Eve.prototype.resolve = function (other) {
  var dx = this.pos.x - other.pos.x;
  var dy = this.pos.y - other.pos.y;
  var len = Math.sqrt(dx * dx + dy * dy);

  if (len < this.size + other.size) {
    this.pos.x += dx / len;
    this.pos.y += dy / len;
    //this.mov.x = 0;
    //this.mov.y = 0;
  }
}

Eve.prototype.draw = function () {
  var ctx = evo.ctx;
  var cx = ctx.canvas.width / 2 - evo.camera.x + this.pos.x;
  var cy = ctx.canvas.height / 2 - evo.camera.y + this.pos.y;

  ctx.beginPath();
  ctx.arc(cx, cy, this.size, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#00aaff';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.stroke();
}

