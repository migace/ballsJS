import {IBall, FillColor} from '../interfaces/ball.interface';
import IBoard from '../interfaces/board.interface';
import Board from "./board";
import Config from './config';

class Ball implements IBall {
  config: Config;
  board: IBoard;
  ctx: CanvasRenderingContext2D;
  colorIndex: number;
  color: string;
  bounce: boolean;
  radius: number;
  x: number;
  y: number;
  bounceInterval: number;

  constructor(radius: number, fillColor: FillColor) {
    this.config = Config.getInstance();
    this.board = new Board();
    this.ctx = this.config.getCtx();
    this.colorIndex = fillColor.index;
    this.color = fillColor.color;
    this.bounce = false;
    this.radius = radius;
  }

  draw(posX: number, posY: number) {
    let startAngle = 0,
        endAngle = 2 * Math.PI;

    this.x = posX;
    this.y = posY;

    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.arc(this.x, this.y, this.radius, startAngle, endAngle, true);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }

  clear() {
    const startX = this.x - this.radius,
          startY = this.y - this.radius,
          width = 2 * this.radius,
          height = 2 * this.radius;

    this.ctx.clearRect(startX, startY, width, height);
  }

  startBounce() {
    this.bounceInterval = setInterval(() => {
      this.clear();

      if (this.bounce) {
        this.draw(this.x, this.y - this.config.ballMargin / 2);
      } else {
        this.draw(this.x, this.y + this.config.ballMargin / 2);
      }

      this.bounce = !this.bounce;
    }, 200);
  }

  stopBounce() {
    clearInterval(this.bounceInterval);
  }
}

export default Ball;
