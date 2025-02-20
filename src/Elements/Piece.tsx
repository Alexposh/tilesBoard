import React, { useEffect, useState } from 'react';

import { Image } from 'react-konva';


interface PlacingPlace{
    x: number;
    y: number;
}

export default function PieceElement({location, imageString, emptyLocation}: {location: number, imageString: string, emptyLocation: number}){
    
    
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const stringForImage = imageString + ".png";

    const positionOfPiece: PlacingPlace = {
        x:  location % 4 == 1 ? 1 : location % 4 == 2 ? 2 : location % 4 == 3 ? 3 : 4,
        y: location <= 4 ? 1 : location <= 8 ? 2 : location <= 12 ? 3 : location <= 16 ? 4 : 2
    };

    const [placing, setPlacing] = useState({x:positionOfPiece.x *110, y: positionOfPiece.y *110});

    useEffect(() => {
    const img = new window.Image();
    img.src = stringForImage;
    img.onload = () => setImage(img);
    }, [stringForImage]);



    const handleClick = () => {
        console.log("Click on piece " );
        setPlacing({x:positionOfPiece.x *110, y: positionOfPiece.y *110});

    }
    
    return(
    <>
       
        <Image width={95} height={95} 
                position={{x: placing.x, y: placing.y}}
                image={image || undefined} onClick={handleClick}/>
    
    </>
)
}

