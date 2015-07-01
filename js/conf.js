MIGACE.namespace('conf');

MIGACE.conf = (function() {
  var cvs,
      ctx,
      rows = 10,
      columns = 10,
      ballMargin = 5;

  getCvs = function() {
    return document.getElementById('gBoard');
  }

  getCtx = function() {
    var cvs = getCvs();
    ctx = cvs.getContext('2d');

    return ctx;
  }

  getCanvasWidth = function() {
    return getCvs().width;
  }

  getCanvasHeight = function() {
    return getCvs().height;
  }

  // public API
  return {
    getCvs: getCvs,
    getCtx: getCtx,
    getCanvasWidth: getCanvasWidth,
    getCanvasHeight: getCanvasHeight,
    rows: rows,
    columns: columns,
    ballMargin: ballMargin
  };
})();
