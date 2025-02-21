import React, { useEffect, useState } from 'react';

import { Image } from 'react-konva';
import { Position } from '../Models/types';


interface PlacingPlace{
    x: number;
    y: number;
}

export default function PieceElement({piece, imageString,  getPiecePosition}: {piece: { id: number, location: number } , imageString: string, getPiecePosition: Function}){
    
    
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const stringForImage = imageString + ".png";

    const positionOfPiece: PlacingPlace = {
        x:  piece.location % 4 == 0 ? 4 : piece.location % 4 == 1 ? 1 : piece.location % 4 == 2 ? 2 : piece.location % 4 == 3 ? 3 : 4,
        y: piece.location <= 4 ? 1 : piece.location <= 8 ? 2 : piece.location <= 12 ? 3 : piece.location <= 16 ? 4 : 2
    };

    const [placing, setPlacing] = useState({x:positionOfPiece.x *110, y: positionOfPiece.y *110});

    useEffect(() => {
    const img = new window.Image();
    img.src = stringForImage;
    img.onload = () => setImage(img);
    }, [stringForImage]);

    

    const handleClick = (e) => {
        let locationOfClickedPiece: Position = {id: piece.id, x: e.target.attrs.x, y: e.target.attrs.y};
        // console.log("location of clicked piece x: " + locationOfClickedPiece.x + " and y: " + locationOfClickedPiece.y);
        getPiecePosition(locationOfClickedPiece);
    }
    const handlePieceMove = (emptyLocation: Position) => {
        setPlacing({x:emptyLocation.x, y: emptyLocation.y});
    }
    
    return(
    <>
       
        <Image width={95} height={95} 
                position={{x: placing.x, y: placing.y}}
                image={image || undefined} onClick={handleClick}
                // draggable 
                                // onDragStart={() => {
                                //     console.log("drag start");

                                // } }
        
                                // onDragEnd={() => {
                                //     console.log("drag end");
                                //     handlePieceMove(emptyLocation);
                                // } }
                                />
    
    </>
)
}

