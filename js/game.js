MIGACE.namespace('game');

MIGACE.game = (function() {
  var board = MIGACE.board,
      ball = MIGACE.ball,
      conf = MIGACE.conf,
      boardArray;

  init = function() {
    // event listeners
    conf.getCvs().addEventListener('mousedown', function(e) {
      var mouseCoordinates = MIGACE.getMousePosition(e);
      boardCoordinates = mousePositionBoard(mouseCoordinates);
    }, false);

    board.draw();
    boardArray = new Array(board.getColumns() * board.getRows());
    boardArray = MIGACE.clearArray(boardArray);
  }

  update = function() {

  }

  mousePositionBoard = function(mouseCoordinates) {
    var x = Math.floor(mouseCoordinates.x / board.getFieldWidth());
    var y = Math.floor(mouseCoordinates.y / board.getFieldHeight());

    return {
      x: x,
      y: y
    };
  }

  return {
    init: init
  }
})();
