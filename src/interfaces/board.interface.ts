interface IBoard {
    rows: number;
    columns: number;
    ctx: CanvasRenderingContext2D;    
    setRows(userRows: number): void;
    setColumns(userColumns: number): void;
    getFieldWidth(): number;
    getFieldHeight(): number;
    draw(colorLine: string, lineWidth: number): void;
    clear(): void;
    getRows(): number;
    getColumns(): number;
}

export default IBoard;
