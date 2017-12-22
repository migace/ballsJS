import Board from './board.interface';

export interface IBall {
    colorIndex: number;
    color: string;
    x: number;
    y: number;
    radius: number;
    ctx: CanvasRenderingContext2D;
    board: Board;
    bounce: boolean;
    bounceInterval: number;
    startBounce(): void;
    stopBounce(): void;
    clear(): void;
}

export interface FillColor {
    color: string,
    index: number
}

export default IBall;
