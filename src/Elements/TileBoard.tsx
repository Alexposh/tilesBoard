import React, { use, useEffect, useState } from "react";
import { Stage, Layer, Rect} from 'react-konva';
import { Position } from "../Models/Position";
import Tile from "./Tile";
import Piece from "./Piece";
import { PieceModel } from "../Models/PieceModel";

interface PlacingPlace{
    x: number;
    y: number;
}

export default function TileBoard() {

    const [pieces, setPieces] = useState<PieceModel[]>([{id: 1, location: 1},{id: 2, location:2 },{id: 3, location: 3},{id: 4, location:4 },
        {id: 5, location: 5},{id: 6, location: 6},{id: 7, location: 7},{id: 8, location:8 },
        {id: 9, location: 9},{id: 10, location:10 },{id: 11, location:11},{id: 12, location:12 },
        {id: 13, location: 13},{id: 14, location: 14},{id: 15, location: 15} ]);

   
    const randomizePieces = () =>{
        const allocatedPlaces: number[] = [];

        for(let i = 0; i < 15; i++){
            let randomIndex = Math.ceil(Math.random() * 15);
            while(allocatedPlaces.includes(randomIndex)){
                randomIndex = Math.ceil(Math.random() * 15);
            }
            allocatedPlaces.push(randomIndex);
        }


        console.log(allocatedPlaces);
        setPieces([{id: 1, location: allocatedPlaces[0]},{id: 2, location:allocatedPlaces[1] },{id: 3, location: allocatedPlaces[2]},{id: 4, location:allocatedPlaces[3] },
            {id: 5, location: allocatedPlaces[4]},{id: 6, location: allocatedPlaces[5]},{id: 7, location: allocatedPlaces[6]},{id: 8, location:allocatedPlaces[7] },
            {id: 9, location: allocatedPlaces[8]},{id: 10, location:allocatedPlaces[9] },{id: 11, location:allocatedPlaces[10]},{id: 12, location:allocatedPlaces[11] },
            {id: 13, location: allocatedPlaces[12]},{id: 14, location: allocatedPlaces[13]},{id: 15, location: allocatedPlaces[14]} ]);
    
        
         } 
  

    const resetPieces = () =>{
        setPieces([{id: 1, location: 1},{id: 2, location:2 },{id: 3, location: 3},{id: 4, location:4 },
            {id: 5, location: 5},{id: 6, location: 6},{id: 7, location: 7},{id: 8, location:8 },
            {id: 9, location: 9},{id: 10, location:10 },{id: 11, location:11},{id: 12, location:12 },
            {id: 13, location: 13},{id: 14, location: 14},{id: 15, location: 15}  ]);    
    } 

    // const determinePieceLocation = (piece:PieceModel) =>{        
    //     const positionOfPiece: PlacingPlace = {
    //         x:  piece.location % 4 == 1 ? 1 : piece.location % 4 == 2 ? 2 : piece.location % 4 == 3 ? 3 : 4,
    //         y: piece.location <= 4 ? 1 : piece.location <= 8 ? 2 : piece.location <= 12 ? 3 : piece.location <= 16 ? 4 : 2
    //     };
    //     return positionOfPiece;
    // }

    // const [occupiedPiece, setOccupiedPiece] = useState(false);

    const initialPositions:Position[] = [
        {id:1, occupied: true}, {id:2, occupied: true}, {id:3, occupied: true}, {id:4, occupied: true},
        {id:5, occupied: true}, {id:6, occupied: true}, {id:7, occupied: true}, {id:8, occupied: true},  
        {id:9, occupied: true}, {id:10, occupied: true}, {id:11, occupied: true}, {id:12, occupied: true},
        {id:13, occupied: true}, {id:14, occupied: true}, {id:15, occupied: true}, {id:16, occupied: true}
    ]; 

   
  
     
    return (
    <>
        <button onClick={randomizePieces} style={{backgroundColor: "blue"}}>Shuffle!</button>
        <button onClick={resetPieces} style={{backgroundColor: "green"}}>Solve!</button>
        <Stage width={880} height={880}>
            <Layer>
                <Rect x={100} y={100} width={450} height={450} fill="gray" />
                 {initialPositions.map((position) => 
                    
                         <Tile key = {position.id} position={position.id} matched={position.id == 3}/>    
                 )}
                   
                    
                                   {pieces.map((piece) => 
                                         
                        <Piece key = {piece.id} location={piece.location} imageString={piece.id.toString()} />                       
                    
                    )} 
             
            </Layer>
        </Stage>

    
   
    </>
    )
}