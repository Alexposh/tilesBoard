import React from "react";

export default function TableData({value}:{value: string}){ 
    return (
        <td style={{backgroundColor: "green", width: "100px", height: "100px", margin: "10px"}}>{value}</td>
    )
}