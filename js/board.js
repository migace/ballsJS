MIGACE.namespace('board');

MIGACE.board = (function() {
  var rows = 11;
  var columns = 11;
  var conf = MIGACE.conf;
  var ctx = conf.getCtx();

  setRows = function (userRows) {
    rows = userRows
  }

  setColumns = function (userColumns) {
    columns = userColumns;
  }

  getFieldWidth = function () {
    return Math.floor(conf.getCanvasWidth() / rows);
  }

  getFieldHeight = function () {
    return Math.floor(conf.getCanvasHeight() / columns);
  }

  draw = function (colorLine, lineWidth) {
    var i, x, y;

    if (typeof colorLine == 'undefined') {
      colorLine = '#000000';
    }

    if (typeof lineWidth == 'undefined') {
      lineWidth = '2';
    }

    ctx.beginPath();
    ctx.strokeStyle = colorLine;
    ctx.lineWidth = lineWidth;

    // horizontal lines
    for (i = 1; i < rows; i += 1) {
      startX = 0;
      startY = getFieldHeight() * i;
      endX = conf.getCanvasWidth();
      endY = startY;

      console.log(endX);
      console.log(startY);

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

      console.log(endX);
      console.log(startY);

      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }

    ctx.closePath();
  }

  // public API
  return {
    draw: draw,
    setRows: setRows,
    setColumns: setColumns
  }
})();
