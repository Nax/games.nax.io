var evo = undefined;

function Evo () {
  var self = this;

  this.canvas = document.getElementById('game');
  this.ctx = this.canvas.getContext('2d');
  this.swarm = [];
  this.resize();
  this.camera = {x: 0, y: 0};
  this.target = {x: 0, y: 0};

  window.setInterval(function () { self.tick(); }, 1000.0 / 60.0);
  window.onresize = function () { self.resize(); };
  document.addEventListener('mousemove', function(e) { 
    self.target.x = -self.canvas.width / 2 - self.camera.x + e.clientX; 
    self.target.y = -self.canvas.height / 2 - self.camera.y + e.clientY;
  }, false);
}

Evo.prototype.resize = function () {
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.ctx.font = '20px Helvetica';
  this.ctx.textBaseline = 'top';
  this.render();
}

Evo.prototype.update = function() {
  for (var eve of this.swarm)
    eve.update();
  for (var a of this.swarm) {
    for (var b of this.swarm) {
      if (a != b) {
        a.resolve(b);
      }
    }
  }
}

Evo.prototype.render = function () {
  var ctx = this.ctx;

  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  for (var eve of this.swarm) {
    eve.draw();
  }
  ctx.fillStyle = 'black';
  ctx.fillText('Swarm size: ' + this.swarm.length, 5, 5);
}

Evo.prototype.tick = function () {
  this.update();
  this.render();
}

window.onload = function () {
  evo = new Evo();
  evo.swarm.push(new Eve(5, 5));
  evo.swarm.push(new Eve(100, 0));
  evo.swarm.push(new Eve(100, 100));
}
