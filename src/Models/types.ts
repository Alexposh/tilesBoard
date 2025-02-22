
export interface PieceModel {
    id: number,
    
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

export interface LegalMove {
    from: Position;
    to: Position[];
}