MIGACE.namespace('checker');

MIGACE.checker = (function() {
  var boardArray = undefined, ball = undefined, balls_in_line = [],
      board = MIGACE.board,
      conf = MIGACE.conf,

  check = function(boardArrayEl, ballEl) {
    var ballPosition;

    boardArray = boardArrayEl;
    ball = ballEl;
    balls_in_line = [];

    //add current ball
    ballPosition = MIGACE.transBoardPosToCoord(ball, board);
    balls_in_line.push(boardArray[MIGACE.transCoordMultiDimToOne(ballPosition, conf.size)]);

    checkBoardHorizontal();
    checkBoardVertical();

    return balls_in_line;
  },

  checkBoardHorizontal = function() {
    if (boardArray === undefined || ball === undefined) {
      return false;
    }

    var ballPosition, index;

    // horizontal leff
    ballPosition = MIGACE.transBoardPosToCoord(ball, board);
    while (ballPosition.x > 0) {
      ballPosition.x -= 1;
      index = MIGACE.transCoordMultiDimToOne(ballPosition, conf.size);
      // i need check if the same color index - the same color

      if (typeof boardArray[index] === 'object' && boardArray[index].colorIndex === ball.colorIndex) {
        balls_in_line.push(boardArray[index]);
      } else {
        break;
      }
    }

    // horizontal right
    ballPosition = MIGACE.transBoardPosToCoord(ball, board);
    while (ballPosition.x < conf.columns) {
      ballPosition.x += 1;
      index = MIGACE.transCoordMultiDimToOne({x: ballPosition.x, y: ballPosition.y}, conf.size);

      // i need check if the same color index - the same color
      if (typeof boardArray[index] === 'object' && boardArray[index].colorIndex == ball.colorIndex) {
        balls_in_line.push(boardArray[index]);
      } else {
        break;
      }
    }
  },

  checkBoardVertical = function() {
    if (boardArray === undefined || ball === undefined) {
      return false;
    }

    var ballPosition, index;

    // vertical up
    ballPosition = MIGACE.transBoardPosToCoord(ball, board);
    while (ballPosition.y > 0) {
      ballPosition.y -= 1;
      index = MIGACE.transCoordMultiDimToOne(ballPosition, conf.size);
      // i need check if the same color index - the same color

      if (typeof boardArray[index] === 'object' && boardArray[index].colorIndex === ball.colorIndex) {
        balls_in_line.push(boardArray[index]);
      } else {
        break;
      }
    }

    // vertical down
    ballPosition = MIGACE.transBoardPosToCoord(ball, board);
    while (ballPosition.y < conf.rows) {
      ballPosition.y += 1;
      index = MIGACE.transCoordMultiDimToOne({x: ballPosition.x, y: ballPosition.y}, conf.size);

      // i need check if the same color index - the same color
      if (typeof boardArray[index] === 'object' && boardArray[index].colorIndex == ball.colorIndex) {
        balls_in_line.push(boardArray[index]);
      } else {
        break;
      }
    }
  };

  return {
    check: check
  };
})();
