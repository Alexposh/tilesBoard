import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect, Group } from 'react-konva';
import { Position } from "../Models/Position";
import Piece from "./Piece";
import { PieceModel } from "../Models/PieceModel";

interface Slot {
    position: Position;
    piece: PieceModel;
    occupied: boolean;
}

export default function TileBoard() {
    const tilePositions: Position[] = [
        { id: 1, x: 110, y: 110 }, { id: 2, x: 220, y: 110 }, { id: 3, x: 330, y: 110 }, { id: 4, x: 440, y: 110 },
        { id: 5, x: 110, y: 220 }, { id: 6, x: 220, y: 220 }, { id: 7, x: 330, y: 220 }, { id: 8, x: 440, y: 220 },
        { id: 9, x: 110, y: 330 }, { id: 10, x: 220, y: 330 }, { id: 11, x: 330, y: 330 }, { id: 12, x: 440, y: 330 },
        { id: 13, x: 110, y: 440 }, { id: 14, x: 220, y: 440 }, { id: 15, x: 330, y: 440 }, { id: 16, x: 440, y: 440 }
    ];

    const [pieces, setPieces] = useState<PieceModel[]>([
        { id: 1, location: 1 }, { id: 2, location: 2 }, { id: 3, location: 3 }, { id: 4, location: 4 },
        { id: 5, location: 5 }, { id: 6, location: 6 }, { id: 7, location: 7 }, { id: 8, location: 8 },
        { id: 9, location: 9 }, { id: 10, location: 10 }, { id: 11, location: 11 }, { id: 12, location: 12 },
        { id: 13, location: 13 }, { id: 14, location: 14 }, { id: 15, location: 15 }, { id: 16, location: 16 }
    ]);

    const [board, setBoard] = useState<Slot[]>([
        { position: { id: 1, x: 110, y: 110 }, piece: { id: 1, location: 1 }, occupied: true },
        { position: { id: 2, x: 220, y: 110 }, piece: { id: 2, location: 2 }, occupied: true },
        { position: { id: 3, x: 330, y: 110 }, piece: { id: 3, location: 3 }, occupied: true },
        { position: { id: 4, x: 440, y: 110 }, piece: { id: 4, location: 4 }, occupied: true },
        { position: { id: 5, x: 110, y: 220 }, piece: { id: 5, location: 5 }, occupied: true },
        { position: { id: 6, x: 220, y: 220 }, piece: { id: 6, location: 6 }, occupied: true },
        { position: { id: 7, x: 330, y: 220 }, piece: { id: 7, location: 7 }, occupied: true },
        { position: { id: 8, x: 440, y: 220 }, piece: { id: 8, location: 8 }, occupied: true },
        { position: { id: 9, x: 110, y: 330 }, piece: { id: 9, location: 9 }, occupied: true },
        { position: { id: 10, x: 220, y: 330 }, piece: { id: 10, location: 10 }, occupied: true },
        { position: { id: 11, x: 330, y: 330 }, piece: { id: 11, location: 11 }, occupied: true },
        { position: { id: 12, x: 440, y: 330 }, piece: { id: 12, location: 12 }, occupied: true },
        { position: { id: 13, x: 110, y: 440 }, piece: { id: 13, location: 13 }, occupied: true },
        { position: { id: 14, x: 220, y: 440 }, piece: { id: 14, location: 14 }, occupied: true },
        { position: { id: 15, x: 330, y: 440 }, piece: { id: 15, location: 15 }, occupied: true },
        { position: { id: 16, x: 440, y: 440 }, piece: { id: 16, location: 16 }, occupied: true }
    ]);

    const shufflePieces = () => {
        const shuffledPieces = [...pieces];
        for (let i = shuffledPieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledPieces[i], shuffledPieces[j]] = [shuffledPieces[j], shuffledPieces[i]];
        }
        setPieces(shuffledPieces);
    };

    const resetPieces = () => {
        setPieces([
            { id: 1, location: 1 }, { id: 2, location: 2 }, { id: 3, location: 3 }, { id: 4, location: 4 },
            { id: 5, location: 5 }, { id: 6, location: 6 }, { id: 7, location: 7 }, { id: 8, location: 8 },
            { id: 9, location: 9 }, { id: 10, location: 10 }, { id: 11, location: 11 }, { id: 12, location: 12 },
            { id: 13, location: 13 }, { id: 14, location: 14 }, { id: 15, location: 15 }, { id: 16, location: 16 }
        ]);
    };

    useEffect(() => {
        const initialBoard = pieces.map((piece, index) => ({
            position: tilePositions[index],
            piece: piece,
            occupied: true
        }));
        setBoard(initialBoard);
    }, [pieces]);

    return (
        <>
            <button onClick={shufflePieces} style={{ backgroundColor: "blue" }}>Shuffle!</button>
            <button onClick={resetPieces} style={{ backgroundColor: "green" }}>Solve!</button>
            <Stage width={880} height={880}>
                <Layer>
                    <Rect x={100} y={100} width={450} height={450} fill="gray" />
                    {board.map((slot) =>
                        <Group key={slot.position.id}>
                            <Rect key={slot.position.id + 15} width={100} height={100}
                                x={slot.position.x}
                                y={slot.position.y}
                                fill={slot.occupied ? "green" : "red"} />
                        </Group>
                    )}
                    {pieces.map((piece) =>
                        <Piece key={piece.id} location={piece.location} imageString={piece.location.toString()} emptyLocation={16} />
                    )}
                </Layer>
            </Stage>
        </>
    );
}
