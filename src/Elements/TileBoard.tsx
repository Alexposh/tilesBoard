import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect, Group } from 'react-konva';
import Piece from "./Piece";
import { Slot } from "../Models/types";
import { Position } from "../Models/types";
import { PieceModel } from "../Models/types";

const tilePositions: Position[] = [
    { id: 1, x: 110, y: 110 }, { id: 2, x: 220, y: 110 }, { id: 3, x: 330, y: 110 }, { id: 4, x: 440, y: 110 },
    { id: 5, x: 110, y: 220 }, { id: 6, x: 220, y: 220 }, { id: 7, x: 330, y: 220 }, { id: 8, x: 440, y: 220 },
    { id: 9, x: 110, y: 330 }, { id: 10, x: 220, y: 330 }, { id: 11, x: 330, y: 330 }, { id: 12, x: 440, y: 330 },
    { id: 13, x: 110, y: 440 }, { id: 14, x: 220, y: 440 }, { id: 15, x: 330, y: 440 }, { id: 16, x: 440, y: 440 }
];

const initialPieces: PieceModel[]=[
    {id:1 }, {id:2 }, {id:3 }, {id:4 },
    {id:5 }, {id:6 }, {id:7 }, {id:8 },
    {id:9 }, {id:10}, {id:11}, {id:12},
    {id:13}, {id:14}, {id:15}, {id:16}];

let ongoingGamePieces: PieceModel[] = [];

const standardBoard: Slot[] = [
        { position: tilePositions[0], piece: initialPieces[0] },         { position: tilePositions[1], piece: initialPieces[1] },
        { position: tilePositions[2], piece: initialPieces[2] },         { position: tilePositions[3], piece: initialPieces[3] },
        { position: tilePositions[4], piece: initialPieces[4] },         { position: tilePositions[5], piece: initialPieces[5] },
        { position: tilePositions[6], piece: initialPieces[6] },         { position: tilePositions[7], piece: initialPieces[7] },
        { position: tilePositions[8], piece: initialPieces[8] },         { position: tilePositions[9], piece: initialPieces[9] },
        { position: tilePositions[10], piece: initialPieces[10] },       { position: tilePositions[11], piece: initialPieces[11] },
        { position: tilePositions[12], piece: initialPieces[12] },       { position: tilePositions[13], piece: initialPieces[13] },
        { position: tilePositions[14], piece: initialPieces[14] },       { position: tilePositions[15], piece: initialPieces[15] }
    ]; 

const generateBoard = (tilePositions: Position[], pieces: PieceModel[]) => {
    const updatedBoard:Slot[] = [];

    tilePositions.forEach((position) => {
        const element:Slot = { position: position, piece: pieces[position.id-1] };
        updatedBoard.push(element);
    });
    // console.log(updatedBoard);
    return updatedBoard;
}

const standardShufflePieces = () => {
    const shuffledPieces = [...initialPieces];
    for (let i = shuffledPieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPieces[i], shuffledPieces[j]] = [shuffledPieces[j], shuffledPieces[i]];
    }
    return shuffledPieces;
};

// switch the position of two pieces that are set as paramenters for the function in the pieces array
// const switchPieces = (pieceToSwitch: PieceModel) => {
//     const pieces = [...initialPieces];
//     const pieceThatWasClicked= pieceToSwitch;
//     const piece16 = pieces.find((piece) => piece.id === 16);
//     const indexOfPiece16 = pieces.indexOf(piece16!);
//     pieces[indexOfPiece16]= pieceThatWasClicked;
//     pieces[pieceThatWasClicked.id-1] = piece16!;

// }



export default function TileBoard() {     

    const [board, setBoard] = useState<Slot[]>(standardBoard);    
    const [ongoingGamePieces, setOngoingGamePieces] = useState<PieceModel[]>(initialPieces);
    
    const handleClickOfPiece = (slot: Slot) => {
    
        if (slot.piece.id !== 16) {
        const pieceThatWasClicked= slot.piece;
        const piece16 = ongoingGamePieces.find((piece) => piece.id === 16);
        const indexOfPiece16 = ongoingGamePieces.indexOf(piece16!);
        ongoingGamePieces[indexOfPiece16]= pieceThatWasClicked;
        ongoingGamePieces[pieceThatWasClicked.id-1] = piece16!;
        setOngoingGamePieces(ongoingGamePieces);
        setBoard(generateBoard(tilePositions, ongoingGamePieces));} 
        else{
            console.log("Piece 16 was clicked, do nothing");
        }
    }


    const shufflePieces = () => {       
        setBoard(generateBoard(tilePositions, standardShufflePieces()));
    };

    const showBoard = () => {
        // generateBoard(tilePositions, shuffledPieces);
        console.log(board);
    }
      

    useEffect(() => {        
        setBoard(standardBoard);
    }, []);

    return (
        <>
            <button onClick={shufflePieces} style={{ backgroundColor: "blue" }}>Shuffle!</button>  
            <button onClick={showBoard} style={{ backgroundColor: "green" }}>ShowShuffledBoard</button>            
            <Stage width={880} height={880}>
                <Layer>
                    <Rect x={100} y={100} width={450} height={450} fill="gray" />
                    {board.map((slot) =>                    
                        <Group key={slot.position.id +20}>
                        <Rect key={slot.position.id +40} width={100} height={100}
                                x={slot.position.x}
                                y={slot.position.y}
                                fill={"green"} />
                        <Piece key={slot.piece.id} 
                                slot={slot}
                                getSlotClicked={handleClickOfPiece}/>                             
                        </Group> 
                    )}                    
                </Layer>
            </Stage>
        </>
    );
}
