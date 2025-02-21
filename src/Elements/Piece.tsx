import React, { useEffect, useState } from 'react';

import { Image } from 'react-konva';
import { Position } from '../Models/types';
import { Slot } from '../Models/types';


interface PlacingPlace{
    x: number;
    y: number;
}

export default function PieceElement({slot, getSlotClicked}: {slot: Slot, getSlotClicked: Function}){
    
    
    const [image, setImage] = useState<HTMLImageElement | null>(null);    

    const imageString=slot.piece.id;
    const stringForImage = imageString + ".png";

    const positionOfPiece: PlacingPlace = {
        x:  slot.position.x,
        y: slot.position.y
    };

    const [placing, setPlacing] = useState({x:positionOfPiece.x , y: positionOfPiece.y});

    useEffect(() => {
    const img = new window.Image();
    img.src = stringForImage;
    img.onload = () => setImage(img);
    }, [stringForImage]);

    

    const handleClick = () => {
        getSlotClicked(slot);
        // console.log(slot.piece);
    }
    // const handlePieceMove = (emptyLocation: Position) => {
    //     setPlacing({x:emptyLocation.x, y: emptyLocation.y});
    // }
    
    return(
    <>
       
        <Image width={95} height={95} 
                position={{x: placing.x, y: placing.y}}
                image={image || undefined} onClick={handleClick}
               />
    
    </>
)
}

