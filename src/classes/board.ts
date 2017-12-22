import IBoard from '../interfaces/board.interface';
import Config from './config';

class Board implements IBoard {
  rows: number;
  columns: number;
  ctx: CanvasRenderingContext2D;
  config: Config;

  constructor() {
    this.config = Config.getInstance();
    this.rows = this.config.getRows();
    this.columns = this.config.getColumns();
    this.ctx = this.config.getCtx();
  }

  getRows() {
    return this.rows;
  }

  getColumns() {
    return this.columns;
  }

  setRows(userRows: number): void {
    this.rows = userRows;
  }

  setColumns(userColumns: number): void {
    this.columns = userColumns;
  }

  getFieldWidth() {
    const cvsWidth: number = this.config.getCanvasWidth();
    return Math.floor( cvsWidth / this.rows);
  }

  getFieldHeight() {
    return Math.floor(this.config.getCanvasHeight() / this.columns);
  }

  draw(colorLine: string, lineWidth: number) {
    let i, x, y;

    this.clear();

    this.ctx.beginPath();
    this.ctx.strokeStyle = colorLine;
    this.ctx.lineWidth = lineWidth;

    // horizontal lines
    for (i = 1; i < this.rows; i += 1) {
      const startX = 0,
            startY = this.getFieldHeight() * i,
            endX = this.config.getCanvasWidth(),
            endY = startY;

      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();
    }

    // vertical lines
    for (i = 1; i < this.columns; i+= 1) {
      const startX = this.getFieldWidth() * i,
            startY = 0,
            endX = startX,
            endY = this.config.getCanvasHeight();

      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();
    }

    this.ctx.closePath();
  }

  clear() {
      const canvasWidth: number = this.config.getCanvasWidth(),
            canvasHeight: number = this.config.getCanvasHeight();

      this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  };
}

export default Board;
