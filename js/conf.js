MIGACE.namespace('conf');

MIGACE.conf = (function() {
  var cvs,
      ctx;

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
    getCtx: getCtx,
    getCanvasWidth: getCanvasWidth,
    getCanvasHeight: getCanvasHeight
  }
})();
