import React, { useEffect, useState } from 'react';

import { Image } from 'react-konva';


interface PlacingPlace{
    x: number;
    y: number;
}

export default function PieceElement({location, imageString}: {location: number, imageString: string}){
    
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const stringForImage = imageString + ".png";

    const positionOfPiece: PlacingPlace = {
        x:  location % 4 == 1 ? 1 : location % 4 == 2 ? 2 : location % 4 == 3 ? 3 : 4,
        y: location <= 4 ? 1 : location <= 8 ? 2 : location <= 12 ? 3 : location <= 16 ? 4 : 2
    };

    useEffect(() => {
    const img = new window.Image();
    img.src = stringForImage;
    img.onload = () => setImage(img);
    }, [stringForImage]);



    const handleClick = () => {
        console.log("Click on piece " );

    }
    
    return(
    <>
       
        <Image width={95} height={95} 
                position={{x: positionOfPiece.x * 110, y: positionOfPiece.y *110}}
                image={image || undefined} onClick={handleClick}/>
    
    </>
)
}

