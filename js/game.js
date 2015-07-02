MIGACE.namespace('game');

MIGACE.game = (function() {
  var board = MIGACE.board,
      ball = MIGACE.ball,
      conf = MIGACE.conf,
      previousPosition = null,
      currentPosition = null,
      boardArray = new Array(),
      is_ball_click = false,

  init = function() {
    var i;

    boardArray = new Array(conf.rows * conf.columns+1).join(0).split('');
    board.draw();

    // event listeners
    conf.getCvs().addEventListener('mousedown', mousedown, false);

    for (i = 0; i < conf.initBallsNumber; i += 1) {
      drawRandomBall();
    }
  },

  mousedown = function(e) {
    var mouseCoordinates,
        boardCoordinates,
        ballPosition,
        fillColor;

    mouseCoordinates = MIGACE.getMousePosition(e);
    boardCoordinates = mousePositionBoard(mouseCoordinates);
    boardArrayIndex = MIGACE.transCoordMultiDimToOne(boardCoordinates, boardArray.length);

    // field doesn't free, ball clicked
    if (is_ball_click == true) {
      is_ball_click = false;
      currentPosition = boardArrayIndex;

      // delete old ball
      ballPreviousPosition = MIGACE.transIndexToBoardCoord(previousPosition, {rows: conf.rows, columns: conf.columns});
      ballPreviousPosition = MIGACE.transCoordToBoardPos(ballPreviousPosition, board);
      previousBall = boardArray[previousPosition];
      fillColor = '#FFFFFF';
      previousBall.draw(ballPreviousPosition.x, ballPreviousPosition.y, board.getFieldWidth() / 2 - conf.ballMargin, fillColor);

      // draw new ball
      ballPosition = MIGACE.transIndexToBoardCoord(boardArrayIndex, {rows: conf.rows, columns: conf.columns});
      ball = MIGACE.ball();
      ballPosition = MIGACE.transCoordToBoardPos(ballPosition, board);
      fillColor = boardArray[previousPosition].color;
      ball.color = fillColor;
      ball.colorIndex =
      ball.draw(ballPosition.x, ballPosition.y, board.getFieldWidth() / 2 - conf.ballMargin, fillColor);

      boardArray[previousPosition] = 0;
      boardArray[currentPosition] = previousBall;
      currentPosition = null;
      previousPosition = null;

      return true;
    }

    if (boardArray[boardArrayIndex] != 0) {
      is_ball_click = true;
      previousPosition = boardArrayIndex;
    }
    else {
      // free field clicked
    }
  },

  mousePositionBoard = function(mouseCoordinates) {
    var x = Math.floor(mouseCoordinates.x / board.getFieldWidth()),
        y = Math.floor(mouseCoordinates.y / board.getFieldHeight());

    return {
      x: x,
      y: y
    };
  },

  coordinatesBallPosition = function(mouseCoordinates) {
    var x = mouseCoordinates.x * Math.floor(board.getFieldWidth() / 2),
        y = mouseCoordinates.y * Math.floor(board.getFieldHeight() / 2);

    return {
      x: x,
      y: y
    };
  },

  drawRandomBall = function(fillColor) {
    // call function to check board is free (min quantuty)
    // TO DO
    var fieldWidth = Math.floor(board.getFieldWidth()),
        fieldHeight = Math.floor(board.getFieldHeight()),
        halfFieldWidth = Math.floor(fieldWidth / 2),
        halfFieldHeight = Math.floor(fieldHeight / 2),
        radius = Math.floor(halfFieldWidth - conf.ballMargin),
        ballColor = MIGACE.getOneColor(),
        xBoard, yBoard, xBallPosition, yBallPosition, index,
        ball;

    // field doesn't free
    do {
      xBoard = Math.floor(Math.random() * conf.rows);
      yBoard = Math.floor(Math.random() * conf.columns);

      index = MIGACE.transCoordMultiDimToOne({x: xBoard, y: yBoard}, boardArray.length);
    } while(boardArray[index] === 0);

    xBallPosition = xBoard * fieldWidth + halfFieldWidth;
    yBallPosition = yBoard * fieldHeight + halfFieldHeight;

    ball = MIGACE.ball();
    ball.draw(xBallPosition, yBallPosition, radius, ballColor.color);
    ball.color = ballColor.color;
    ball.colorIndex = ballColor.index;
    boardArray[index] = ball;
  };

  return {
    init: init
  }
})();
