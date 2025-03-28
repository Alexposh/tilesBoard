import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Group } from "react-konva";
import Piece from "./Piece";
import { LegalMove, Slot } from "../Models/types";
import { Position } from "../Models/types";
import { PieceModel } from "../Models/types";

const tilePositions: Position[] = [
  { id: 1, x: 110, y: 110 },
  { id: 2, x: 220, y: 110 },
  { id: 3, x: 330, y: 110 },
  { id: 4, x: 440, y: 110 },
  { id: 5, x: 110, y: 220 },
  { id: 6, x: 220, y: 220 },
  { id: 7, x: 330, y: 220 },
  { id: 8, x: 440, y: 220 },
  { id: 9, x: 110, y: 330 },
  { id: 10, x: 220, y: 330 },
  { id: 11, x: 330, y: 330 },
  { id: 12, x: 440, y: 330 },
  { id: 13, x: 110, y: 440 },
  { id: 14, x: 220, y: 440 },
  { id: 15, x: 330, y: 440 },
  { id: 16, x: 440, y: 440 },
];

const initialPieces: PieceModel[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
  { id: 15 },
  { id: 16 },
];

const standardBoard: Slot[] = [];

const generateBoard = (tilePositions: Position[], pieces: PieceModel[]) => {
  const updatedBoard: Slot[] = [];

  tilePositions.forEach((position) => {
    const element: Slot = {
      position: position,
      piece: pieces[position.id - 1],
    };
    updatedBoard.push(element);
  });
  return updatedBoard;
};

const legalMoves: LegalMove[] = [
  { from: 0, to: [1, 4] },
  { from: 3, to: [2, 7] },
  { from: 12, to: [8, 13] },
  { from: 15, to: [11, 14] },

  { from: 1, to: [0, 2, 5] },
  { from: 2, to: [1, 3, 6] },
  { from: 4, to: [0, 5, 8] },
  { from: 7, to: [3, 6, 11] },
  { from: 8, to: [4, 9, 12] },
  { from: 11, to: [7, 10, 15] },
  { from: 13, to: [9, 12, 14] },
  { from: 14, to: [10, 13, 15] },

  { from: 5, to: [1, 4, 6, 9] },
  { from: 6, to: [2, 5, 7, 10] },
  { from: 9, to: [5, 8, 10, 13] },
  { from: 10, to: [6, 9, 11, 14] },
];

const standardShufflePieces = () => {
  const shuffledPieces = [...initialPieces];
  for (let i = shuffledPieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledPieces[i], shuffledPieces[j]] = [
      shuffledPieces[j],
      shuffledPieces[i],
    ];
  }

  return shuffledPieces;
};

const date = new Date();
// const showTime = date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds();
export default function TileBoard() {
  const Ref = useRef(null);
  const [board, setBoard] = useState<Slot[]>(
    generateBoard(tilePositions, initialPieces)
  );
  const [ongoingGamePieces, setOngoingGamePieces] =
    useState<PieceModel[]>(initialPieces);
  const [startTime, setStartTime] = useState<number>();
  const [endTime, setEndTime] = useState<number>();
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [timePassed, setTimePassed] = useState<number[]>([0, 0, 0]);
  const [counting, setCounting] = useState<boolean>();

  const handleClickOfPiece = (slot: Slot) => {
    const positionOfClickedPiece = slot.position.id - 1;
    console.log(positionOfClickedPiece);
    const legalMovesOfClickedPiece = legalMoves.find(
      (move) => move.from === positionOfClickedPiece
    );
    legalMovesOfClickedPiece && console.log(legalMovesOfClickedPiece.to);

    if (legalMovesOfClickedPiece && slot.piece.id !== 16) {
      const pieceThatWasClicked = slot.piece;
      const piece16 = ongoingGamePieces.find((piece) => piece.id === 16);
      const indexOfPieceClicked = ongoingGamePieces.indexOf(
        pieceThatWasClicked!
      );
      const indexOfPiece16 = ongoingGamePieces.indexOf(piece16!);
      console.log(indexOfPieceClicked);
      console.log(indexOfPiece16);

      // if the index of peice 16 is in the array of legalmovesofclicked piece
      if (legalMovesOfClickedPiece.to.includes(indexOfPiece16)) {
        // console.log(" OOHHHOOO Empty space is in the possible moves of the piece");
        const newOngoingGamePieces = [...ongoingGamePieces];
        newOngoingGamePieces[indexOfPiece16] = pieceThatWasClicked;
        newOngoingGamePieces[indexOfPieceClicked] = piece16!;
        setOngoingGamePieces(newOngoingGamePieces);
        setBoard(generateBoard(tilePositions, newOngoingGamePieces));
      } else {
        console.log("!!!That piece cannot move there");
      }
    } else {
      console.log("Piece 16 was clicked, do nothing");
    }
  };

  const shufflePieces = () => {
    setOngoingGamePieces(standardShufflePieces());
  };
  const getTimePassed = (startAtTime) => {
    const timePassed = new Date();
    const spentTime = timePassed.getTime() - startAtTime;
    const seconds = Math.floor((spentTime / 1000) % 60);
    const minutes = Math.floor((spentTime / 1000 / 60) % 60);
    const hours = Math.floor((spentTime / 1000 / 60 / 60) % 24);

    counting && setTimePassed([seconds, minutes, hours]);

  };

 
  const clearTimer = () => {
    setTimePassed([0, 0, 0]);
  };

  useEffect(() => {
    setBoard(generateBoard(tilePositions, ongoingGamePieces));

    let interval = 0;

    if (counting && startTime) {
      interval = setInterval(() => {
        getTimePassed(startTime);
      }, 1000);
    } else {
      if (interval > 0) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };

    // clearTimer();
  }, [ongoingGamePieces, counting, startTime]);

  return (
    <>
      <button
        onClick={shufflePieces}
        style={{ backgroundColor: "blue", margin: "10px" }}
      >
        Shuffle!
      </button>
      <button
        onClick={() => {
          setBoard(generateBoard(tilePositions, initialPieces));
        }}
        style={{ backgroundColor: "green", margin: "10px" }}
      >
        Reset board
      </button>

      <hr />

      {/* <h3>Started at:{showTime}</h3> */}
      <button
        onClick={() => {
          const startedAtTime = new Date();
          setStartTime(0);
          setStartTime(startedAtTime.getTime());
          setCounting(true);
          console.log(
            "timer started at:",
            startedAtTime.getHours() +
              ":" +
              startedAtTime.getMinutes() +
              ":" +
              startedAtTime.getSeconds()
          );
        }}
        style={{ backgroundColor: "red", margin: "10px" }}
      >
        Start time
      </button>

      <button
        onClick={() => {
          if (startTime) {
            const completedAtTime = new Date();
            setEndTime(completedAtTime.getTime());
            setTimeTaken(endTime ? (endTime - startTime) / 1000 : 0);
            setCounting(false);
            console.log(
              "timer ended at:",
              completedAtTime.getHours() +
                ":" +
                completedAtTime.getMinutes() +
                ":" +
                completedAtTime.getSeconds()
            );
          }
        }}
        style={{ backgroundColor: "orange", margin: "10px" }}
      >
        Stop timer
      </button>
      <button
        onClick={clearTimer}
        style={{ backgroundColor: "gray", margin: "10px" }}
      >
        Reset timer
      </button>

      <div>
        <button style={{ backgroundColor: "#996451", margin: "10px", width: "200px" }}>Hours: {timePassed[2]}</button>
        <button style={{ backgroundColor: "#996451", margin: "10px", width: "200px" }}>Minutes: {timePassed[1]}</button>
        <button style={{ backgroundColor: "#996451", margin: "10px", width: "200px" }}>Seconds: {timePassed[0]}</button>
      
      </div>
    

      {/* <h4>{date.getTime()}</h4> */}
      <div className="countTime"></div>
      <Stage width={880} height={880}>
        <Layer>
          <Rect x={105} y={105} width={448} height={448} fill="gray" />
          {board.map((slot) => (
            <Piece
              key={slot.position.id}
              slot={slot}
              getSlotClicked={handleClickOfPiece}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
}
