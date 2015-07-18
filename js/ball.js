MIGACE.namespace('ball');

MIGACE.ball = (function() {
  var board = MIGACE.board,
      conf = MIGACE.conf,
      ctx = conf.getCtx(),
      colorIndex = -1,
      color = '#000000',
      x = undefined,
      y = undefined,
      radius = undefined,
      Constr,
      bounce = false,
      bounceIntv = undefined;

  Constr = function() {
    this.color = '#000000';
    this.colorIndex = -1;
    this.x = undefined;
    this.y = undefined;
  };

  Constr.prototype = {
    constructor: Constr,

    draw: function(posX, posY, radius, fillColor) {
      var startAngle = 0,
          endAngle = 2 * Math.PI;

      if (typeof posX !== 'undefined' && typeof posY !== 'undefined' && typeof radius !== 'undefined') {
        this.x = posX;
        this.y = posY;
        this.radius = radius;
      }

      if (this.x === undefined || this.y === undefined) {
        throw {
          name: 'Ball coordinates are fail!',
          message: 'X or Y coordinate is fail. Function can\'t draw ball correct'
        };
      }

      if (this.radius === undefined) {
        throw {
          name: 'Ball radius is fail!',
          message: 'Value of radius is incorrect.'
        }
      }

      if (typeof fillColor === 'object') {
        this.color = fillColor.color;
        this.colorIndex = fillColor.index;
      }

      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.strokeStyle = '#FFFFFF';
      ctx.arc(this.x, this.y, this.radius, startAngle, endAngle, true);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    },

    clear: function() {
      if (this.x === undefined || this.y === undefined) {
        throw {
          name: 'Ball coordinates are fail!',
          message: 'X or Y coordinate is fail. Function can\'t cler ball field'
        };
      }

      var startX = this.x - this.radius,
          startY = this.y - this.radius,
          width = 2 * this.radius,
          height = 2 * this.radius;

      ctx.clearRect(startX, startY, width, height);
    },

    startBounce: function() {
      var that = this;

      bounceIntv = setInterval(function() {
        that.clear();

        if (bounce) {
          that.draw(that.x, that.y - conf.ballMargin / 2, that.radius);
        } else {
          that.draw(that.x, that.y + conf.ballMargin / 2, that.radius);
        }

        bounce = !bounce;
      }, 200);
    },

    stopBounce: function() {
      clearInterval(bounceIntv);
    }
  };

  // return constructor for creating many objects
  return Constr;
})();
