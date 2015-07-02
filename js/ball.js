MIGACE.namespace('ball');

MIGACE.ball = (function() {
  var board = MIGACE.board,
      conf = MIGACE.conf,
      ctx = conf.getCtx();

    function Ball() {
      return {
        colorIndex: -1,
        color: '#000000',

        draw: function(posX, posY, radius, fillColor) {
          var startAngle = 0,
              endAngle = 2 * Math.PI;

          if (typeof fillColor === 'undefined') {
            color = '#E2E2E2';
          } else {
            color = fillColor;
          }

          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.strokeStyle = '#FFFFFF';
          ctx.arc(posX, posY, radius, startAngle, endAngle, true);
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
        }
      }
    }

    // return constructor for creating many objects
    return Ball;
})();
