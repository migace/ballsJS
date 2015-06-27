MIGACE.namespace('game');

MIGACE.game = (function() {
  var board = MIGACE.board;
  var conf = MIGACE.conf;

  init = function() {
    board.draw();
  }

  ctx = function() {
    var cvs = document.getElementById("gBoard");
    var ctx = cvs.getContext('2d');

    return ctx;
  }

  return {
    init: init,
    ctx: ctx
  }
})();
