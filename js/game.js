MIGACE.namespace('game');

MIGACE.game = (function() {
  var board = MIGACE.board,
      ball = new MIGACE.ball(),
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

    drawBalls();
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
        fillColor;

    mouseCoordinates = MIGACE.getMousePosition(e);
    boardCoordinates = mousePositionBoard(mouseCoordinates);
    boardArrayIndex = MIGACE.transCoordMultiDimToOne(boardCoordinates, boardArray.length);

    // field doesn't free, ball clicked
    if (is_ball_click == true) {
      is_ball_click = false;
      currentPosition = boardArrayIndex;
      previousBall = boardArray[previousPosition];
      ball = new MIGACE.ball();
      ball = MIGACE.cloneObject(previousBall, ball);

      // delete old ball
      ballPreviousPosition = MIGACE.transIndexToBoardCoord(previousPosition, {rows: conf.rows, columns: conf.columns});
      ballPreviousPosition = MIGACE.transCoordToBoardPos(ballPreviousPosition, board);
      previousBall.draw(ballPreviousPosition.x, ballPreviousPosition.y, board.getFieldWidth() / 2 - conf.ballMargin, {color: '#FFFFFF', index: 0});

      // draw new ball
      ballPosition = MIGACE.transIndexToBoardCoord(boardArrayIndex, {rows: conf.rows, columns: conf.columns});
      ballPosition = MIGACE.transCoordToBoardPos(ballPosition, board);
      ball.draw(ballPosition.x, ballPosition.y, board.getFieldWidth() / 2 - conf.ballMargin);

      boardArray[previousPosition] = 0;
      boardArray[currentPosition] = ball;
      currentPosition = null;
      previousPosition = null;

      var f = checkBallsHorizontalLine(ball);
      if (f == false) {
        update();
      }

      return true;
    }

    if (typeof boardArray[boardArrayIndex] === 'object') {
      is_ball_click = true;
      previousPosition = boardArrayIndex;
    }
    else {
      // free field clicked
    }
  },

  update = function() {
    drawBalls();
  }

  checkBallsHorizontalLine = function(ball) {
    var balls_in_line = [],
        ballPosition =  MIGACE.transBoardPosToCoord(ball, board),
        index;

    //add current ball
    balls_in_line.push(boardArray[MIGACE.transCoordMultiDimToOne(ballPosition, conf.size)]);

    // horizontal leff
    while (ballPosition.x >= 0) {
      ballPosition.x -= 1;
      index = MIGACE.transCoordMultiDimToOne(ballPosition, conf.size);
      // i need check if the same color index - the same color
      if (typeof boardArray[index] === 'object' && boardArray[index].colorIndex == ball.colorIndex) {
        balls_in_line.push(boardArray[index]);
      } else {
        // another color, break counting
        break;
      }
    }

    // horizontal right
    ballPosition = MIGACE.transBoardPosToCoord(ball, board);
    while (ballPosition.x <= conf.columns) {
      ballPosition.x += 1;
      index = MIGACE.transCoordMultiDimToOne({x: ballPosition.x, y: ballPosition.y}, conf.size);

      // i need check if the same color index - the same color
      if (boardArray[index].colorIndex == ball.colorIndex) {
        balls_in_line.push(boardArray[index]);
      } else {
        // another color, break counting
        break;
      }
    }

    if (balls_in_line.length >= 5) {
      // delete balls
      // TO DO
      return true;
    }

    return false;
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
