MIGACE.namespace('game');

MIGACE.game = (function() {
  var board = MIGACE.board,
      ball = MIGACE.ball,
      conf = MIGACE.conf,
      innitBallsNumber = 3,
      ballMargin = 5,
      boardArray;

  init = function() {
    var mouseCoordinates,
        i;
    // event listeners
    conf.getCvs().addEventListener('mousedown', function(e) {
      mouseCoordinates = MIGACE.getMousePosition(e);
      boardCoordinates = mousePositionBoard(mouseCoordinates);
    }, false);

    board.draw();
    boardArray = new Array(board.getColumns() * board.getRows());
    boardArray = MIGACE.clearArray(boardArray);

    for (i = 0; i < innitBallsNumber; i += 1) {
      randomBalls();
    }
  }

  update = function() {

  }

  mousePositionBoard = function(mouseCoordinates) {
    var x = Math.floor(mouseCoordinates.x / board.getFieldWidth()),
        y = Math.floor(mouseCoordinates.y / board.getFieldHeight());

    return {
      x: x,
      y: y
    };
  }

  coordinatesBallPosition = function(mouseCoordinates) {
    var x = mouseCoordinates.x * Math.floor(board.getFieldWidth() / 2),
        y = mouseCoordinates.y * Math.floor(board.getFieldHeight() / 2);

    return {
      x: x,
      y: y
    };
  }

  randomBalls = function(quantity) {
    // call function to check board is free (min quantuty)
    // TO DO
    var fieldWidth = Math.floor(board.getFieldWidth()),
        halfFieldWidth = Math.floor(board.getFieldWidth()/2),
        x = Math.floor(Math.random() * board.getRows()) * fieldWidth + halfFieldWidth,
        y = Math.floor(Math.random() * board.getRows()) * fieldWidth + halfFieldWidth,
        radius = Math.floor(board.getFieldWidth() / 2 - ballMargin),
        ballColor = MIGACE.getOneColor();
        index = MIGACE.transCoordMultiDimToOne({x: x, y: y}, boardArray.length),
        ball;

    // field doesn't free
    while (boardArray[index] === 0) {
      x = Math.floor(Math.random() * board.getRows()) * fieldWidth + halfFieldWidth;
      y = Math.floor(Math.random() * board.getRows()) * fieldWidth + halfFieldWidth;
      index = MIGACE.transCoordMultiDimToOne({x: x, y: y}, boardArray.length);
    }

    ball = MIGACE.ball;
    ball.draw(x, y, radius, ballColor.color);
    boardArray[index] = ballColor.index;
  }

  return {
    init: init
  }
})();
