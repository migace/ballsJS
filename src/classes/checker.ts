import IBall from '../interfaces/ball.interface';
import IBoard from '../interfaces/board.interface';
import Config from './config';
import {
  transBoardPosToCoord,
  transCoordMultiDimToOne
} from '../common';

class Checker {
  ballsInLine: Array<IBall>;
  board: IBoard;
  boardArray: Array<boolean | IBall>;
  config: Config;
  ball: IBall;

  constructor(board: IBoard, boardArray: Array<boolean | IBall>) {
    this.ballsInLine = [];
    this.board = board;
    this.boardArray = boardArray;
    this.config = Config.getInstance();
  }

  check(ball: IBall): Array<IBall> {
    this.ball = ball;
    this.ballsInLine = [];

    this.checkDirection(this.checkBoardHorizontally);
    this.checkDirection(this.checkBoardVertically);
    this.checkDirection(this.checkBoardLeftSkant);
    this.checkDirection(this.checkBoardRightSkant);

    return this.ballsInLine;
  }

  checkDirection(callback: () => void) {
    let ballPosition;

    if (this.ballsInLine.length < 5) {
      this.ballsInLine = [];
      ballPosition = transBoardPosToCoord(this.ball, this.board);
      this.ballsInLine.push(this.boardArray[transCoordMultiDimToOne(ballPosition, this.config.size)] as IBall);
    }

    callback.call(this);
  }

  checkBoardHorizontally() {
    let ballPosition, index;

    // horizontal leff
    ballPosition = transBoardPosToCoord(this.ball, this.board);
    while (ballPosition.x > 0) {
      ballPosition.x -= 1;
      index = transCoordMultiDimToOne(ballPosition, this.config.size);

      if (this.boardArray[index] && (this.boardArray[index] as IBall).colorIndex === this.ball.colorIndex) {
        this.ballsInLine.push(this.boardArray[index] as IBall);
      } else {
        break;
      }
    }

    // horizontal right
    ballPosition = transBoardPosToCoord(this.ball, this.board);
    while (ballPosition.x < this.config.columns) {
      ballPosition.x += 1;
      index = transCoordMultiDimToOne({x: ballPosition.x, y: ballPosition.y}, this.config.size);

      if (this.boardArray[index] && (this.boardArray[index] as IBall).colorIndex === this.ball.colorIndex) {
        this.ballsInLine.push(this.boardArray[index] as IBall);
      } else {
        break;
      }
    }
  }

  checkBoardVertically() {
    let ballPosition, index;

    // vertical up
    ballPosition = transBoardPosToCoord(this.ball, this.board);
    while (ballPosition.y > 0) {
      ballPosition.y -= 1;
      index = transCoordMultiDimToOne(ballPosition, this.config.size);

      if (this.boardArray[index] && (this.boardArray[index] as IBall).colorIndex === this.ball.colorIndex) {
        this.ballsInLine.push(this.boardArray[index] as IBall);
      } else {
        break;
      }
    }

    // vertical down
    ballPosition = transBoardPosToCoord(this.ball, this.board);
    while (ballPosition.y < this.config.rows) {
      ballPosition.y += 1;
      index = transCoordMultiDimToOne({x: ballPosition.x, y: ballPosition.y}, this.config.size);

      if (this.boardArray[index] && (this.boardArray[index] as IBall).colorIndex === this.ball.colorIndex) {
        this.ballsInLine.push(this.boardArray[index] as IBall);
      } else {
        break;
      }
    }
  }

  checkBoardLeftSkant = function() {   
    let ballPosition, index;

    // left up
    ballPosition = transBoardPosToCoord(this.ball, this.board);
    while (ballPosition.x > 0 && ballPosition.y > 0) {
      ballPosition.x -= 1;
      ballPosition.y -= 1;
      index = transCoordMultiDimToOne(ballPosition, this.config.size);

      if (this.boardArray[index] && (this.boardArray[index] as IBall).colorIndex === this.ball.colorIndex) {
        this.ballsInLine.push(this.board[index] as IBall);
      } else {
        break;
      }
    }

    // right bottom
    ballPosition = transBoardPosToCoord(this.ball, this.board);
    while (ballPosition.x < this.config.columns && ballPosition.y < this.config.rows) {
      ballPosition.x += 1;
      ballPosition.y += 1;
      index = transCoordMultiDimToOne({x: ballPosition.x, y: ballPosition.y}, this.config.size);

      if (this.boardArray[index] && (this.boardArray[index] as IBall).colorIndex === this.ball.colorIndex) {
        this.ballsInLine.push(this.board[index] as IBall);
      } else {
        break;
      }
    }
  }

  checkBoardRightSkant() {
    let ballPosition, index;

    // right up
    ballPosition = transBoardPosToCoord(this.ball, this.board);
    while (ballPosition.x < this.config.columns && ballPosition.y > 0) {
      ballPosition.x += 1;
      ballPosition.y -= 1;
      index = transCoordMultiDimToOne(ballPosition, this.config.size);

      if (this.boardArray[index] && (this.boardArray[index] as IBall).colorIndex === this.ball.colorIndex) {
        this.ballsInLine.push(this.boardArray[index] as IBall);
      } else {
        break;
      }
    }

    // left bottom
    ballPosition = transBoardPosToCoord(this.ball, this.board);
    while (ballPosition.x > 0 && ballPosition.y < this.config.rows) {
      ballPosition.x -= 1;
      ballPosition.y += 1;
      index = transCoordMultiDimToOne({x: ballPosition.x, y: ballPosition.y}, this.config.size);

      // i need check if the same color index - the same color
      if (this.boardArray[index] && (this.boardArray[index] as IBall).colorIndex === this.ball.colorIndex) {
        this.ballsInLine.push(this.boardArray[index] as IBall);
      } else {
        break;
      }
    }
  }
}

export default Checker;
