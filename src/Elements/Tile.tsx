import React from "react";
import { Position } from "../Models/Position";
import { Rect } from "react-konva";

interface PlacingPlace{
    x: number;
    y: number;
}
export default function Tile({x,y}: {x: number, y: number}) {
    
       const handleClick = () => {
        console.log("Click on empty tile");
       
    }
    
    return(
    <>
        <Rect width={100} height={100} 
                x={x} 
                y={y} 
                fill={"green"} 
                onClick={handleClick} /> 
    </>
    
)
}