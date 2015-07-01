MIGACE.namespace('board');

MIGACE.board = (function() {
  var rows = 10,
      columns = 10,
      conf = MIGACE.conf,
      ctx = conf.getCtx(),

  getRows = function() {
    return rows;
  },

  getColumns = function() {
    return columns;
  },

  setRows = function (userRows) {
    rows = userRows
  },

  setColumns = function (userColumns) {
    columns = userColumns;
  },

  getFieldWidth = function () {
    return Math.floor(conf.getCanvasWidth() / rows);
  },

  getFieldHeight = function () {
    return Math.floor(conf.getCanvasHeight() / columns);
  },

  draw = function (colorLine, lineWidth) {
    var i, x, y;

    if (typeof colorLine == 'undefined') {
      colorLine = '#000000';
    }

    if (typeof lineWidth == 'undefined') {
      lineWidth = '2';
    }

    clear();

    ctx.beginPath();
    ctx.strokeStyle = colorLine;
    ctx.lineWidth = lineWidth;

    // horizontal lines
    for (i = 1; i < rows; i += 1) {
      startX = 0;
      startY = getFieldHeight() * i;
      endX = conf.getCanvasWidth();
      endY = startY;

      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }

    // vertical lines
    for (i = 1; i < columns; i+= 1) {
      startX = getFieldWidth() * i;
      startY = 0;
      endX = startX;
      endY = conf.getCanvasHeight();

      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }

    ctx.closePath();
  },

  clear = function() {
      var canvasWidth = conf.getCanvasWidth(),
          canvasHeight = conf.getCanvasHeight();

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  // public API
  return {
    draw: draw,
    setRows: setRows,
    setColumns: setColumns,
    getFieldWidth: getFieldWidth,
    getFieldHeight: getFieldHeight,
    getColumns: getColumns,
    getRows: getRows
  }
})();
