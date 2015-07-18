MIGACE.namespace('conf');

MIGACE.conf = (function() {
  var cvs,
      ctx,
      rows = 10,
      columns = 10,
      ballMargin = 5,
      ballsNumber = 3,
      ballsInLine = 5,
      size = rows * columns,
      basic_points = 5;

  getCvs = function() {
    return document.getElementById('gBoard');
  },

  canvasDeviceSize = function() {
    var cvs = getCvs();

    if (window.innerWidth === 360) {
      cvs.width = 300;
      cvs.height = 300;
    }
  },

  getCtx = function() {
    var cvs = getCvs();
    ctx = cvs.getContext('2d');

    return ctx;
  },

  getCanvasWidth = function() {
    return getCvs().width;
  },

  getCanvasHeight = function() {
    return getCvs().height;
  };

  // public API
  return {
    getCvs: getCvs,
    getCtx: getCtx,
    getCanvasWidth: getCanvasWidth,
    getCanvasHeight: getCanvasHeight,
    rows: rows,
    columns: columns,
    ballMargin: ballMargin,
    ballsNumber: ballsNumber,
    ballsInLine: ballsInLine,
    size: size,
    basic_points: basic_points,
    canvasDeviceSize: canvasDeviceSize
  };
})();
