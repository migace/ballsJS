MIGACE.namespace('game');

MIGACE.game = (function() {
  var board = MIGACE.board,
      ball = new MIGACE.ball(),
      conf = MIGACE.conf,
      previousPosition = undefined,
      currentPosition = undefined,
      boardArray = new Array(),
      is_ball_click = false,

  init = function() {
    boardArray = new Array(conf.rows * conf.columns);
    boardArray = MIGACE.clearArray(boardArray, boardArray.length);

    board.draw();
    drawBalls();

    // event listeners
    conf.getCvs().addEventListener('mousedown', mousedown, false);
  },

  drawBalls = function() {
    for (i = 0; i < conf.ballsNumber; i += 1) {
      drawRandomBall();
    }
  }

  mousedown = function(e) {
    var mouseCoordinates,
        boardCoordinates,
        ballPosition,
        fillColor,
        boardArrayIndex,
        scores;

    mouseCoordinates = MIGACE.getMousePosition(e);
    boardCoordinates = mousePositionBoard(mouseCoordinates);
    boardArrayIndex = MIGACE.transCoordMultiDimToOne(boardCoordinates, boardArray.length);

    if (typeof boardArray[boardArrayIndex] === 'object') {
      is_ball_click = true;

      if (previousPosition !== undefined && typeof boardArray[previousPosition] === 'object') {
        boardArray[previousPosition].stopBounce();
      }

      previousPosition = boardArrayIndex;
      boardArray[previousPosition].startBounce();
    }
    else {
      if (is_ball_click === true) {
        is_ball_click = false;
        currentPosition = boardArrayIndex;
        previousBall = boardArray[previousPosition];
        ball = new MIGACE.ball();
        ball = MIGACE.cloneObject(previousBall, ball);

        // delete old ball
        if (previousPosition !== undefined && typeof boardArray[previousPosition] === 'object') {
          boardArray[previousPosition].stopBounce();
        }

        previousBall.clear();
        boardArray[previousPosition] = undefined;
        //removeBall(previousPosition);

        // draw new ball
        ballPosition = MIGACE.transIndexToBoardCoord(boardArrayIndex, {rows: conf.rows, columns: conf.columns});
        ballPosition = MIGACE.transCoordToBoardPos(ballPosition, board);
        ball.draw(ballPosition.x, ballPosition.y, board.getFieldWidth() / 2 - conf.ballMargin);

        boardArray[previousPosition] = 0;
        boardArray[currentPosition] = ball;
        currentPosition = null;
        previousPosition = null;

        scores = checkBalls(ball);
        if (typeof scores === 'undefined') {
          update(scores);
        }

        return true;
      }
    }
  },

  update = function(scores) {
    drawBalls();
    MIGACE.interface.updateScore(scores);
  }

  checkBalls = function(ball) {
    var checker = MIGACE.checker,
        balls_in_line = undefined,
        score = undefined;

    balls_in_line = checker.check(boardArray, ball);

    if (balls_in_line.length >= 5) {
      radius = board.getFieldWidth() / 2 - conf.ballMargin;
      arrayLength = boardArray.length;

      for (i = 0, max = balls_in_line.length; i < max; i += 1) {
        coordinates = MIGACE.transBoardPosToCoord(balls_in_line[i], board);
        index = MIGACE.transCoordMultiDimToOne(coordinates, arrayLength);

        //removeBall(index);
        boardArray[index].clear();
        boardArray[index] = undefined;
      }

      scores = conf.basic_points;
      scores += balls_in_line.length % conf.basic_points;

      return scores;
    }

    return undefined;
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

  removeBall = function(index) {
    var ballCoordinates = MIGACE.transIndexToBoardCoord(index, {rows: conf.rows, columns: conf.columns}),
        ballPosition = MIGACE.transCoordToBoardPos(ballCoordinates, board),
        ball = new MIGACE.ball(),
        radius = board.getFieldWidth() / 2 - conf.ballMargin;

    ball.draw(ballPosition.x, ballPosition.y, radius, {color: '#FFFFFF', index: 0});
    boardArray[index] = null;
    ball = null;
  },

  drawRandomBall = function(fillColor) {
    // call function to check board is free (min quantuty)
    // TO DO
    var radius = Math.floor(board.getFieldWidth() / 2 - conf.ballMargin),
        ballColor = MIGACE.getOneColor(),
        xBoard, yBoard, xBallPosition, yBallPosition, index,
        ball, ballPosition;

    // field doesn't free
    do {
      xBoard = Math.floor(Math.random() * conf.rows);
      yBoard = Math.floor(Math.random() * conf.columns);

      index = MIGACE.transCoordMultiDimToOne({x: xBoard, y: yBoard}, boardArray.length);
    } while(typeof boardArray[index] === 'object');

    ballPosition = MIGACE.transCoordToBoardPos({x: xBoard, y: yBoard}, board);

    ball = new MIGACE.ball();
    ball.draw(ballPosition.x, ballPosition.y, radius, ballColor);

    boardArray[index] = ball;
  };

  return {
    init: init
  }
})();
