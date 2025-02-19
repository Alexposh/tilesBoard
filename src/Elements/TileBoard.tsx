import React, { use, useEffect, useState } from "react";
import { Stage, Layer, Rect, Group} from 'react-konva';
import { Position } from "../Models/Position";
import Tile from "./Tile";
import Piece from "./Piece";
import { PieceModel } from "../Models/PieceModel";

interface Slot{
    position: Position;
    piece: PieceModel;
    occupied: boolean;
}



export default function TileBoard() {

    const tilePositions:Position[] = [
        {id:1, x: 110, y: 110}, {id:2, x: 220, y: 110}, {id:3, x: 330, y: 110}, {id:4, x: 440, y: 110},
        {id:5, x: 110, y: 220}, {id:6, x: 220, y: 220}, {id:7, x: 330, y: 220}, {id:8, x: 440, y: 220},  
        {id:9, x: 110, y: 330}, {id:10, x: 220, y: 330}, {id:11, x: 330, y: 330}, {id:12, x: 440, y: 330},
        {id:13, x: 110, y: 440}, {id:14, x: 220, y: 440}, {id:15, x: 330, y: 440}, {id:16, x: 440, y: 440}
    ]; 

    const [pieces, setPieces] = useState<PieceModel[]>([{id: 1, location: 1},{id: 2, location:2 },{id: 3, location: 3},{id: 4, location:4 },
        {id: 5, location: 5},{id: 6, location: 6},{id: 7, location: 7},{id: 8, location:8 },
        {id: 9, location: 9},{id: 10, location:10 },{id: 11, location:11},{id: 12, location:12 },
        {id: 13, location: 13},{id: 14, location: 14},{id: 15, location: 15} ]);

    const [board, setBoard] = useState<Slot[]>([{position: {id: 1, x: 110, y: 110}, piece: {id: 1, location: 1}, occupied: true},
                                                {position: {id: 2, x: 220, y: 110}, piece: {id: 2, location: 2}, occupied: true},
                                                {position: {id: 3, x: 330, y: 110}, piece: {id: 3, location: 3}, occupied: true},
                                                {position: {id: 4, x: 440, y: 110}, piece: {id: 4, location: 4}, occupied: true},        
                                                {position: {id: 5, x: 110, y: 220}, piece: {id: 5, location: 5}, occupied: true},
                                                {position: {id: 6, x: 220, y: 220}, piece: {id: 6, location: 6}, occupied: true},
                                                {position: {id: 7, x: 330, y: 220}, piece: {id: 7, location: 7}, occupied: true},
                                                {position: {id: 8, x: 440, y: 220}, piece: {id: 8, location: 8}, occupied: true},      
                                                {position: {id: 9, x: 110, y: 330}, piece: {id: 9, location: 9}, occupied: true},
                                                {position: {id: 10, x: 220, y: 330}, piece: {id: 10, location: 10}, occupied: true},        
                                                {position: {id: 11, x: 330, y: 330}, piece: {id: 11, location: 11}, occupied: true},
                                                {position: {id: 12, x: 440, y: 330}, piece: {id: 12, location: 12}, occupied: true},       
                                                {position: {id: 13, x: 110, y: 440}, piece: {id: 13, location: 13}, occupied: true},        
                                                {position: {id: 14, x: 220, y: 440}, piece: {id: 14, location: 14}, occupied: true},
                                                {position: {id: 15, x: 330, y: 440}, piece: {id: 15, location: 15}, occupied: true},
                                                {position: {id: 16, x: 440, y: 440}, piece: {id: 16, location: 16}, occupied: true}
    ]);
   
    const randomizePieces = () =>{
        const allocatedPlaces: number[] = [];

        for(let i = 0; i < 15; i++){
            let randomIndex = Math.ceil(Math.random() * 15);
            while(allocatedPlaces.includes(randomIndex)){
                randomIndex = Math.ceil(Math.random() * 15);
            }
            allocatedPlaces.push(randomIndex);
        }


        // console.log(allocatedPlaces);
        // console.log(pieces);
        setPieces([{id: 1, location: allocatedPlaces[0]},{id: 2, location:allocatedPlaces[1] },{id: 3, location: allocatedPlaces[2]},{id: 4, location:allocatedPlaces[3] },
            {id: 5, location: allocatedPlaces[4]},{id: 6, location: allocatedPlaces[5]},{id: 7, location: allocatedPlaces[6]},{id: 8, location:allocatedPlaces[7] },
            {id: 9, location: allocatedPlaces[8]},{id: 10, location:allocatedPlaces[9] },{id: 11, location:allocatedPlaces[10]},{id: 12, location:allocatedPlaces[11] },
            {id: 13, location: allocatedPlaces[12]},{id: 14, location: allocatedPlaces[13]},{id: 15, location: allocatedPlaces[14]}]);
        
        // console.log(pieces);
    
        
         } 
  

    const resetPieces = () =>{
        setPieces([{id: 1, location: 1},{id: 2, location:2 },{id: 3, location: 3},{id: 4, location:4 },
            {id: 5, location: 5},{id: 6, location: 6},{id: 7, location: 7},{id: 8, location:8 },
            {id: 9, location: 9},{id: 10, location:10 },{id: 11, location:11},{id: 12, location:12 },
            {id: 13, location: 13},{id: 14, location: 14},{id: 15, location: 15} ]);    
    } 

    // const determinePieceLocation = (piece:PieceModel) =>{        
    //     const positionOfPiece: PlacingPlace = {
    //         x:  piece.location % 4 == 1 ? 1 : piece.location % 4 == 2 ? 2 : piece.location % 4 == 3 ? 3 : 4,
    //         y: piece.location <= 4 ? 1 : piece.location <= 8 ? 2 : piece.location <= 12 ? 3 : piece.location <= 16 ? 4 : 2
    //     };
    //     return positionOfPiece;
    // }

    // const [occupiedPiece, setOccupiedPiece] = useState(false);

   

   
  
     
    return (
    <>
        <button onClick={randomizePieces} style={{backgroundColor: "blue"}}>Shuffle!</button>
        <button onClick={resetPieces} style={{backgroundColor: "green"}}>Solve!</button>
        <Stage width={880} height={880}>
            <Layer>
                <Rect x={100} y={100} width={450} height={450} fill="gray" />
                 {tilePositions.map((position) => 
                    <Group>
                                        <Rect width={100} height={100} 
                                            x={position.x} 
                                            y={position.y} 
                                            fill={"green"}/>   
                                        {/* <Piece key = {position.id} location={pieces[3].location} imageString={position.id.toString()} />  */}

                    </Group>
                         
                 )}
                   
                    
                {pieces.map((piece) =>                                         
                        <Piece key = {piece.id} location={piece.location} imageString={piece.location.toString()} emptyLocation = {16}/>                 
                    
                    )} 
             
            </Layer>
        </Stage>

    
   
    </>
    )
}