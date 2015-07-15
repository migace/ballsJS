MIGACE.namespace('ball');

MIGACE.ball = (function() {
  var board = MIGACE.board,
      conf = MIGACE.conf,
      ctx = conf.getCtx(),
      colorIndex = -1,
      color = '#000000',
      x = null,
      y = null,
      Constr;

  Constr = function() {
    this.color = '#000000';
    this.colorIndex = -1;
    this.x = null;
    this.y = null;
  };

  Constr.prototype = {
    constructor: Constr,
    draw: function(posX, posY, radius, fillColor) {
      var startAngle = 0,
          endAngle = 2 * Math.PI;

      this.x = posX;
      this.y = posY;

      if (typeof fillColor === 'object') {
        this.color = fillColor.color;
        this.colorIndex = fillColor.index;
      }

      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.strokeStyle = '#FFFFFF';
      ctx.arc(posX, posY, radius, startAngle, endAngle, true);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
  };

  // return constructor for creating many objects
  return Constr;
})();
