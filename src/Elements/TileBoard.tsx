import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect, Group } from 'react-konva';

import Piece from "./Piece";
import { Slot } from "../Models/types";
import { Position } from "../Models/types";
import { PieceModel } from "../Models/types";



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
        { position: tilePositions[0], piece: pieces[0] },         { position: tilePositions[1], piece: pieces[1] },
        { position: tilePositions[2], piece: pieces[2] },         { position: tilePositions[3], piece: pieces[3] },

        { position: tilePositions[4], piece: pieces[4] },         { position: tilePositions[5], piece: pieces[5]},
        { position: tilePositions[6], piece: pieces[6] },         { position: tilePositions[7], piece: pieces[7] },

        { position: tilePositions[8], piece: pieces[8] },         { position: tilePositions[9], piece: pieces[9] },
        { position: tilePositions[10], piece: pieces[10] },       { position: tilePositions[11], piece: pieces[11] },

        { position: tilePositions[12], piece: pieces[12] },       { position: tilePositions[13], piece: pieces[13] },
        { position: tilePositions[14], piece: pieces[14] },       { position: tilePositions[15], piece: pieces[15] },
    ]);
    const [emptyLocation, setEmptyLocation] = useState<Position>(tilePositions[15]);

    const handleEmptyPositionChangeFromPieceElement = (emptyLocation: Position) => {
        setEmptyLocation(emptyLocation);
        console.log("emptyLocation x: " + emptyLocation.x + " and y: " + emptyLocation.y);
        
    }

    const handleClickOfPiece = (e) => {
        let locationOfClickedPiece: Position = {id: e.id, x: e.x, y: e.y};
        console.log("location of clicked piece x: " + locationOfClickedPiece.x + " and y: " + locationOfClickedPiece.y);
        // find the piece that was clicked in the board array
        const foundPieceInBoard = board.filter((slot) => slot.position.x === locationOfClickedPiece.x && slot.position.y === locationOfClickedPiece.y)[0].piece = e;
        console.log(foundPieceInBoard);

        // fint the piece with id 16 in the board array
        const piece16PieceInBoard = board.filter((slot) => slot.piece.id === 16)[0].position;
        console.log(piece16PieceInBoard);

        setBoard([
            { position: tilePositions[0], piece: pieces[15] },         { position: tilePositions[1], piece: pieces[1] },
            { position: tilePositions[2], piece: pieces[2] },         { position: tilePositions[3], piece: pieces[3] },
    
            { position: tilePositions[4], piece: pieces[4] },         { position: tilePositions[5], piece: pieces[5]},
            { position: tilePositions[6], piece: pieces[6] },         { position: tilePositions[7], piece: pieces[7] },
    
            { position: tilePositions[8], piece: pieces[8] },         { position: tilePositions[9], piece: pieces[9] },
            { position: tilePositions[10], piece: pieces[10] },       { position: tilePositions[11], piece: pieces[11] },
    
            { position: tilePositions[12], piece: pieces[12] },       { position: tilePositions[13], piece: pieces[13] },
            { position: tilePositions[14], piece: pieces[14] },       { position: tilePositions[15], piece: pieces[0] },
        ]);


    }


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
            { id: 13, location: 13 }, { id: 14, location: 14 }, { id: 15, location: 15 },  //{ id: 16, location: 16 }
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
                                fill={"green"} />
                        <Piece key={slot.position.id} 
                                piece={slot.piece}
                                imageString={slot.piece.location.toString()} 
                                getPiecePosition={handleClickOfPiece}/>                             
                        </Group> 
                    )}
                    
                        {/* <Rect x={600} 
                                y={600} 
                                width={100} 
                                height={100} 
                                fill="red"
                                draggable 
                                onDragStart={() => {
                                    console.log("drag start");

                                } }
        
                                onDragEnd={() => {
                                    console.log("drag end");
                                    handlePieceMove(emptyLocation);
                                } }                                            
                        /> */}
                </Layer>
            </Stage>
        </>
    );
}
