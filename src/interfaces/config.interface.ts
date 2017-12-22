interface IConfig {
    readonly cvs: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;
    readonly rows: number;
    readonly columns: number;
    readonly ballMargin: number;
    readonly ballsNumber: number;
    readonly ballsInLine: number;
    readonly size: number;
    readonly basicPoints: number;
    canvasDeviceSize(): void;
    getCvs(): HTMLCanvasElement;
    getCtx(): CanvasRenderingContext2D    
    getCanvasWidth(): number;
    getCanvasHeight(): number;
    getRows(): number;
    getColumns(): number;
}

export default IConfig;
