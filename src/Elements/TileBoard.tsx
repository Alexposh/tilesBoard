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

// const legalMoves:LegalMove[] = [
//     { from: 1, to: [2, 5] },
//     { from: 4, to: [3, 8] },    
//     { from: 13, to: [9, 14] },
//     { from: 16, to: [12, 15] },

//     { from: 2, to: [1, 3, 6] }, 
//     { from: 3, to: [2, 2, 7] },
//     { from: 5, to: [1, 6, 9] },
//     { from: 8, to: [4, 7, 12] },
//     { from: 9, to: [5, 10, 13] },
//     { from: 12, to: [8, 11, 16] },
//     { from: 14, to: [10, 13, 15] },
//     { from: 15, to: [11, 14, 16] },

//     { from: 6, to: [2, 5, 7, 10] }, 
//     { from: 7, to: [3, 6, 8, 11] },
//     { from: 10, to: [6, 9, 11, 14] },    
//     { from: 11, to: [7, 10, 12, 15] },
//     ];

    const legalMoves:LegalMove[] = [
        { from: 0, to: [1, 4] },
        { from: 3, to: [2, 7] },    
        { from: 12, to: [8, 13] },
        { from: 15, to: [11, 14] },
    
        { from: 1, to: [0, 2, 5] }, 
        { from: 2, to: [1, 3, 6] },
        { from: 4, to: [0, 5, 8] },
        { from: 7, to: [3, 6, 11] },
        { from: 8, to: [4, 9, 12] },
        { from: 11, to: [7, 10, 15] },
        { from: 13, to: [9, 12, 14] },
        { from: 14, to: [10, 13, 15] },
    
        { from: 5, to: [1, 4, 6, 9] }, 
        { from: 6, to: [2, 5, 7, 10] },
        { from: 9, to: [5, 8, 10, 13] },    
        { from: 10, to: [6, 9, 11, 14] },
        ];

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
        const positionOfClickedPiece = slot.position.id -1;   
        console.log(positionOfClickedPiece); 
        const legalMovesOfClickedPiece = legalMoves.find((move) => move.from === positionOfClickedPiece);
        legalMovesOfClickedPiece && console.log(legalMovesOfClickedPiece.to);

       
        
        if (legalMovesOfClickedPiece && slot.piece.id !== 16) {
            const pieceThatWasClicked = slot.piece;
            const piece16 = ongoingGamePieces.find((piece) => piece.id === 16);
            const indexOfPieceClicked = ongoingGamePieces.indexOf(pieceThatWasClicked!);
            const indexOfPiece16 = ongoingGamePieces.indexOf(piece16!);
            console.log(indexOfPieceClicked);
            console.log(indexOfPiece16);

            // if the index of peice 16 is in the array of legalmovesofclicked piece
            if (legalMovesOfClickedPiece.to.includes(indexOfPiece16)) {
                // console.log(" OOHHHOOO Empty space is in the possible moves of the piece");
                const newOngoingGamePieces = [...ongoingGamePieces];
                newOngoingGamePieces[indexOfPiece16] = pieceThatWasClicked;
                newOngoingGamePieces[indexOfPieceClicked] = piece16!;
                setOngoingGamePieces(newOngoingGamePieces);
                setBoard(generateBoard(tilePositions, newOngoingGamePieces));
                // console.log(newOngoingGamePieces);
            } else {
                // console.log("!!!That piece cannot move there"); 
            }
            
            // const newOngoingGamePieces = [...ongoingGamePieces];
            // newOngoingGamePieces[indexOfPiece16] = pieceThatWasClicked;
            // newOngoingGamePieces[indexOfPieceClicked] = piece16!;
            // setOngoingGamePieces(newOngoingGamePieces);
            // setBoard(generateBoard(tilePositions, newOngoingGamePieces));
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
