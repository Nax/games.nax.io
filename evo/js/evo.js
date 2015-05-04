var evo = undefined;

function Evo () {
  var self = this;

  this.canvas = document.getElementById('game');
  this.ctx = this.canvas.getContext('2d');
  this.swarm = [];
  this.resize();
  window.setInterval(function () { self.tick(); }, 1000.0 / 60.0);
  window.onresize = function () { self.resize(); };
}

Evo.prototype.resize = function () {
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.ctx.font = '20px Helvetica';
  this.ctx.textBaseline = 'top';
  this.render();
}

Evo.prototype.update = function() {

}

Evo.prototype.render = function () {
  var ctx = this.ctx;

  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  for (var eve in this.swarm) {
    eve.draw();
  }
  ctx.fillText('Swarm size: ' + this.swarm.length, 5, 5);
}

Evo.prototype.tick = function () {
  this.update();
  this.render();
}

window.onload = function () {
  evo = new Evo();
}
