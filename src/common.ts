import IBoard from './interfaces/board.interface';
import Config from './classes/config';
import {
  IMousePosition
} from './interfaces/common.interface';

export function clearArray(dataArray: Array<any>): Array<boolean> {
  return dataArray.map(item => item = false);
}

export function getMousePosition(e: MouseEvent): IMousePosition {
  let x: number,
      y: number,
      config = Config.getInstance(),
      rect = config.getCvs().getBoundingClientRect();

  if (e.x && e.y) {
    x = e.x;
    y = e.y;
  } else {
    x = e.clientX + document.body.scrollLeft +
      document.documentElement.scrollLeft;

    y = e.clientY + document.body.scrollTop +
      document.documentElement.scrollTop;
  }

  x -= rect.left;
  y -= rect.top;

  return {
    x,
    y
  };
}

export function getOneColor() {
  const color = ['#F7B800', '#FA3400', '#69F500', '#00F7CE', '#000BBD'],
        randomNumber = Math.floor(Math.random()*color.length);

  return {
    color: color[randomNumber],
    index: randomNumber
  };
}

export function transCoordMultiDimToOne(coordinates: any, arrayLength: number) {
  return Math.floor(coordinates.y * (arrayLength/10) + coordinates.x);
}

export function transIndexToBoardCoord(index: number, board: IBoard) {
  const x = Math.floor(index % board.columns),
        y = Math.floor(index / board.rows);

  return {
    x,
    y
  };
}

export function transCoordToBoardPos(coordinates: any, board: IBoard) {
  const x = coordinates.x * board.getFieldWidth() + board.getFieldWidth() / 2,
        y = coordinates.y * board.getFieldHeight() + board.getFieldHeight() / 2;

  return {
    x,
    y
  };
}

export function transBoardPosToCoord(boardPosition: any, board: IBoard) {
  const x = Math.floor((boardPosition.x  - board.getFieldWidth() / 2) / board.getFieldWidth()),
        y = Math.floor((boardPosition.y  - board.getFieldHeight() / 2) / board.getFieldHeight());

  return {
    x,
    y
  };
}

export function cloneObject(from: any, to: any) {
  for (let attr in from) {
    if (from.hasOwnProperty(attr)) to[attr] = from[attr];
  }

  return to;
}
