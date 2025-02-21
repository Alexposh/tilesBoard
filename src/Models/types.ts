
export interface PieceModel {
    id: number,
    location: number
}

export interface Position {
    id: number,    
    x: number,
    y: number
}
export interface Slot {
    position: Position;
    piece: PieceModel;   
}