import IBoard from '../interfaces/board.interface';
import IBall from '../interfaces/ball.interface';
import Checker from './checker';
import UiInterface from './uiInterface';
import {
  IMousePosition
} from '../interfaces/common.interface';
import Board from './board';
import Ball from './ball';
import Config from '../classes/config';
import {
  clearArray,
  getMousePosition, 
  getOneColor, 
  transCoordMultiDimToOne,
  transCoordToBoardPos,
  transIndexToBoardCoord,
  transBoardPosToCoord,
  cloneObject
} from '../common';

class Game {
  private static instance: Game;
  board: IBoard;
  ball: IBall;
  config: Config;
  previousPosition: number;
  currentPosition: number;
  scores: number;
  boardArray: Array<boolean | IBall>;
  isBallClicked: boolean;
  ui: UiInterface;
  checker: Checker;

  private constructor() {
    this.config = Config.getInstance();
    this.config.canvasDeviceSize();
    this.boardArray = new Array(this.config.getRows() * this.config.getColumns());
    this.boardArray = clearArray(this.boardArray);
    this.board = new Board();
    this.board.draw("#000", 2);
    this.drawBalls();
    this.config.getCvs().addEventListener('mousedown', this.mousedownHandler.bind(this), false);
    this.scores = 0;
    this.ui = UiInterface.getInstance();
    this.checker = new Checker(this.board, this.boardArray);
  }

  static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }

    return Game.instance;
  }

  init() {
    this.constructor();
  }

  drawBalls() {
    for (let i = 0; i < this.config.ballsNumber; i++) {
      this.drawRandomBall();
    }
  }

  drawRandomBall(): void {
    // @TODO
    // call function to check board is free (min quantity)    
    const radius = Math.floor(this.board.getFieldWidth() / 2 - this.config.ballMargin),
          ballColor = getOneColor();
        
    let x, y, xBallPosition, yBallPosition, index,
        ball, ballPosition;

    // field doesn't free
    do {
      x = Math.floor(Math.random() * this.config.rows);
      y = Math.floor(Math.random() * this.config.columns);

      index = transCoordMultiDimToOne({x, y}, this.boardArray.length);
    } while(this.boardArray[index]);

    ballPosition = transCoordToBoardPos({x, y}, this.board);

    ball = new Ball(radius, ballColor);
    ball.draw(ballPosition.x, ballPosition.y);

    this.boardArray[index] = ball;
  }

  mousePositionBoard(mouseCoordinates: IMousePosition) {
    return {
      x: Math.floor(mouseCoordinates.x / this.board.getFieldWidth()),
      y: Math.floor(mouseCoordinates.y / this.board.getFieldHeight())
    };
  }

  mousedownHandler(e: MouseEvent) {
    let mouseCoordinates: IMousePosition,
        boardCoordinates,
        ballPosition,
        fillColor,
        boardArrayIndex;

    mouseCoordinates = getMousePosition(e);
    boardCoordinates = this.mousePositionBoard(mouseCoordinates);
    boardArrayIndex = transCoordMultiDimToOne(boardCoordinates, this.boardArray.length);

    if (this.boardArray[boardArrayIndex]) {
      this.isBallClicked = true;

      if (this.previousPosition && this.boardArray[this.previousPosition]) {
        (this.boardArray[this.previousPosition] as IBall).stopBounce();
      }

      this.previousPosition = boardArrayIndex;
      (this.boardArray[this.previousPosition] as IBall).startBounce();
    } else {
      if (this.isBallClicked) {
        this.isBallClicked = false;
        this.currentPosition = boardArrayIndex;

        let ball = new Ball(this.board.getFieldWidth() / 2 - this.config.ballMargin, getOneColor());
        const previousBall = this.boardArray[this.previousPosition];              
        
        ball = cloneObject(previousBall, ball);

        // delete old ball
        if (this.previousPosition && this.boardArray[this.previousPosition]) {
          (this.boardArray[this.previousPosition] as IBall).stopBounce();
        }

        (previousBall as IBall).clear();
        this.boardArray[this.previousPosition] = false;

        // draw new ball
        ballPosition = transIndexToBoardCoord(boardArrayIndex, this.board);
        ballPosition = transCoordToBoardPos(ballPosition, this.board);
        ball.draw(ballPosition.x, ballPosition.y);

        this.boardArray[this.previousPosition] = false;
        this.boardArray[this.currentPosition] = ball;
        this.currentPosition = null;
        this.previousPosition = null;

        this.update(ball);

        return true;
      }
    }
  }

  update(ball: IBall) {
    this.scores = this.checkBalls(ball);

    if (this.scores) {
        this.ui.updateScore(this.scores);
    } else {
      this.drawBalls();
    }  
  }

  checkBalls(ball: IBall) : number | null {
    let ballsInLine = this.checker.check(ball),
        radius, coordinates, index;

    if (ballsInLine.length >= 5) {
      radius = this.board.getFieldWidth() / 2 - this.config.ballMargin;

      for (let i = 0, max = ballsInLine.length; i < max; i++) {
        coordinates = transBoardPosToCoord(ballsInLine[i], this.board);
        index = transCoordMultiDimToOne(coordinates, this.boardArray.length);

        (this.boardArray[index] as IBall).clear();
        this.boardArray[index] = false;
      }

      this.scores = this.config.basicPoints;
      this.scores += ballsInLine.length % this.config.basicPoints;

      return this.scores;
    }

    return null;
  }

  coordinatesBallPosition = function(mouseCoordinates: any) {
    var x = mouseCoordinates.x * Math.floor(this.board.getFieldWidth() / 2),
        y = mouseCoordinates.y * Math.floor(this.board.getFieldHeight() / 2);

    return {
      x,
      y
    };
  }

  removeBall(index: number): void {
    let ballCoordinates = transIndexToBoardCoord(index, this.board),
        ballPosition = transCoordToBoardPos(ballCoordinates, this.board),
        ball = new Ball(
          Math.floor(this.board.getFieldWidth() / 2 - this.config.ballMargin),
          {color: '#FFFFFF', index: 0}
        );

    ball.draw(ballPosition.x, ballPosition.y);
    this.boardArray[index] = false;
  }
}

export default Game;
  