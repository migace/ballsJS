MIGACE.namespace('ball');

MIGACE.ball = (function() {
  var board = MIGACE.board,
      conf = MIGACE.conf,
      ctx = conf.getCtx(),

    draw = function(posX, posY, radius, fillColor) {
      var startAngle = 0,
          endAngle = 2 * Math.PI;

      if (typeof fillColor === 'undefined') {
        fillColor = '#E2E2E2';
      }

      ctx.beginPath();
      ctx.fillStyle = fillColor;
      ctx.arc(posX, posY, radius, startAngle, endAngle, true);
      ctx.fill();
      ctx.closePath();
    }

    // return constructor for creating many objects
    return {
        draw: draw
    }
})();
