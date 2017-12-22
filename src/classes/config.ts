import IConfig from '../interfaces/config.interface';

class Config implements IConfig {
  private static instance: Config;
  
  rows: number;
  columns: number;
  ballMargin: number;
  ballsInLine: number;
  ballsNumber: number;
  size: number;
  basicPoints: number;
  cvs: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  private constructor() {
    this.rows = 10;
    this.columns = 10;
    this.ballMargin = 5;
    this.ballsNumber = 3;
    this.ballsInLine = 5;
    this.size = this.rows * this.columns;
    this.basicPoints = 5;
  }
  
  static getInstance() {    
      if (!Config.instance) {
          Config.instance = new Config();
      }

      return Config.instance;
  }

  getCvs(): HTMLCanvasElement {
    return <HTMLCanvasElement>document.getElementById('gBoard');
  }

  canvasDeviceSize(): void {
    const cvs = this.getCvs();

    if (window.innerWidth === 360) {
      cvs.width = 300;
      cvs.height = 300;
    }
  }

  getCtx(): CanvasRenderingContext2D {    
    return this.getCvs().getContext('2d');
  }

  getCanvasWidth(): number {
    return this.getCvs().width;
  }

  getCanvasHeight(): number {
    return this.getCvs().height;
  }
  
  getRows(): number {
    return this.rows;
  }

  getColumns(): number {
    return this.columns;
  }
}

export default Config;
