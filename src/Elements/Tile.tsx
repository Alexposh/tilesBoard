import React from "react";
import { Position } from "../Models/Position";
import { Rect } from "react-konva";

interface PlacingPlace{
    x: number;
    y: number;
}
export default function Tile({position, matched}: {position: number, matched:boolean}) {
    
    const positionOfTile: PlacingPlace = {
        x:  position % 4 == 1 ? 1 : position % 4 == 2 ? 2 : position % 4 == 3 ? 3 : 4,
        y: position <= 4 ? 1 : position<= 8 ? 2 : position <= 12 ? 3 : position <= 16 ? 4 : 2
    };

    const handleClick = () => {
        console.log("Click on empty tile");
       
    }
    
    return(
    <>
        <Rect width={100} height={100} 
                x={positionOfTile.x * 110} 
                y={(positionOfTile.y * 110)} 
                fill={matched ? "green" :"red"} 
                onClick={handleClick} /> 
    </>
    
)
}