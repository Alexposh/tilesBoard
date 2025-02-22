import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect, Group } from 'react-konva';
import Piece from "./Piece";
import { LegalMove, Slot } from "../Models/types";
import { Position } from "../Models/types";
import { PieceModel } from "../Models/types";

const tilePositions: Position[] = [
    { id: 1, x: 110, y: 110 }, { id: 2, x: 220, y: 110 }, { id: 3, x: 330, y: 110 }, { id: 4, x: 440, y: 110 },
    { id: 5, x: 110, y: 220 }, { id: 6, x: 220, y: 220 }, { id: 7, x: 330, y: 220 }, { id: 8, x: 440, y: 220 },
    { id: 9, x: 110, y: 330 }, { id: 10, x: 220, y: 330 }, { id: 11, x: 330, y: 330 }, { id: 12, x: 440, y: 330 },
    { id: 13, x: 110, y: 440 }, { id: 14, x: 220, y: 440 }, { id: 15, x: 330, y: 440 }, { id: 16, x: 440, y: 440 }
];

const initialPieces: PieceModel[] = [
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },
    { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 },
    { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 },
    { id: 13 }, { id: 14 }, { id: 15 }, {id:16}
];

const standardBoard: Slot[] = [
    { position: tilePositions[0], piece: initialPieces[0] }, { position: tilePositions[1], piece: initialPieces[1] },
    { position: tilePositions[2], piece: initialPieces[2] }, { position: tilePositions[3], piece: initialPieces[3] },
    { position: tilePositions[4], piece: initialPieces[4] }, { position: tilePositions[5], piece: initialPieces[5] },
    { position: tilePositions[6], piece: initialPieces[6] }, { position: tilePositions[7], piece: initialPieces[7] },
    { position: tilePositions[8], piece: initialPieces[8] }, { position: tilePositions[9], piece: initialPieces[9] },
    { position: tilePositions[10], piece: initialPieces[10] }, { position: tilePositions[11], piece: initialPieces[11] },
    { position: tilePositions[12], piece: initialPieces[12] }, { position: tilePositions[13], piece: initialPieces[13] },
    { position: tilePositions[14], piece: initialPieces[14] }, { position: tilePositions[15], piece: initialPieces[15]}
];

const generateBoard = (tilePositions: Position[], pieces: PieceModel[]) => {
    const updatedBoard: Slot[] = [];

    tilePositions.forEach((position) => {
        const element: Slot = { position: position, piece: pieces[position.id - 1] };
        updatedBoard.push(element);
    });
    return updatedBoard;
}

const legalMoves:LegalMove[] = [
    { from: tilePositions[0], to: [tilePositions[1], tilePositions[4]] },
    { from: tilePositions[3], to: [tilePositions[2], tilePositions[7]] },    
    { from: tilePositions[12], to: [tilePositions[8], tilePositions[13]] },
    { from: tilePositions[15], to: [tilePositions[11], tilePositions[16]] },

    { from: tilePositions[1], to: [tilePositions[0], tilePositions[2], tilePositions[5]] }, 
    { from: tilePositions[2], to: [tilePositions[1], tilePositions[3], tilePositions[6]] },
    { from: tilePositions[4], to: [tilePositions[0], tilePositions[5], tilePositions[8]] },
    { from: tilePositions[7], to: [tilePositions[3], tilePositions[6], tilePositions[11]] },
    { from: tilePositions[8], to: [tilePositions[4], tilePositions[9], tilePositions[12]] },
    { from: tilePositions[11], to: [tilePositions[7], tilePositions[10], tilePositions[15]] },
    { from: tilePositions[13], to: [tilePositions[9], tilePositions[12], tilePositions[14]] },
    { from: tilePositions[14], to: [tilePositions[10], tilePositions[13], tilePositions[16]] },

    { from: tilePositions[5], to: [tilePositions[1], tilePositions[4], tilePositions[6], tilePositions[9]] }, 
    { from: tilePositions[6], to: [tilePositions[2], tilePositions[5], tilePositions[7], tilePositions[10]] },
    { from: tilePositions[9], to: [tilePositions[5], tilePositions[8], tilePositions[10], tilePositions[13]] },    
    { from: tilePositions[10], to: [tilePositions[6], tilePositions[9], tilePositions[11], tilePositions[14]] },
    ]
    ;

const canMoveToPlaces:string[] = [  "from 1 can move to 2 and 5",
                                    "from 4 can move to 3 and 8",
                                    "from 13 can move to 9 and 14",
                                    "from 16 can move to 12 and 15",

                                    "from 2 can move to 1, 3 and 6",
                                    "from 3 can move to 2, 4 and 7",                                    
                                    "from 5 can move to 1, 6 and 9",
                                    "from 8 can move to 4, 7,and 12",
                                    "from 9 can move to 5, 10 and 13",
                                    "from 12 can move to 8, 11 and 16",
                                    "from 14 can move to 10, 13, 15",
                                    "from 15 can move to 11, 14, 16",

                                    "from 6 can move to 2, 5, 7 and 10",
                                    "from 7 can move to 3, 6, 8 and 11",                                  
                                    "from 10 can move to 6, 9, 11 and 14",
                                    "from 11 can move to 7, 10, 12 and 15"                                  
];


const standardShufflePieces = () => {
    const shuffledPieces = [...initialPieces];
    for (let i = shuffledPieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPieces[i], shuffledPieces[j]] = [shuffledPieces[j], shuffledPieces[i]];
    }

    return shuffledPieces;
};

export default function TileBoard() {

    const [board, setBoard] = useState<Slot[]>(standardBoard);
    const [ongoingGamePieces, setOngoingGamePieces] = useState<PieceModel[]>(initialPieces);

    const handleClickOfPiece = (slot: Slot) => {
        if (slot.piece && slot.piece.id !== 16) {
            const pieceThatWasClicked = slot.piece;
            const piece16 = ongoingGamePieces.find((piece) => piece.id === 16);
            const indexOfPieceClicked = ongoingGamePieces.indexOf(pieceThatWasClicked!);
            const indexOfPiece16 = ongoingGamePieces.indexOf(piece16!);
            // console.log(indexOfPieceClicked);
            // console.log(indexOfPiece16);
            const newOngoingGamePieces = [...ongoingGamePieces];
            newOngoingGamePieces[indexOfPiece16] = pieceThatWasClicked;
            newOngoingGamePieces[indexOfPieceClicked] = piece16!;
            setOngoingGamePieces(newOngoingGamePieces);
            setBoard(generateBoard(tilePositions, newOngoingGamePieces));
            // console.log(newOngoingGamePieces);
        } else {
            console.log("Piece 16 was clicked, do nothing");
        }
    }

    const shufflePieces = () => {
        setOngoingGamePieces(standardShufflePieces());
        setBoard(generateBoard(tilePositions, ongoingGamePieces));
    };

    return (
        <>
            <button onClick={shufflePieces} style={{ backgroundColor: "blue", margin: "10px" }}>Shuffle!</button>
            <Stage width={880} height={880}>
                <Layer>
                    <Rect x={100} y={100} width={450} height={450} fill="gray" />
                    {board.map((slot) =>                      
                                                       
                            <Piece key={slot.position.id}
                                slot={slot}
                                getSlotClicked={handleClickOfPiece} />
                        
                    )}
                </Layer>
            </Stage>
        </>
    );
}
