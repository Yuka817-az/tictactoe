import { useState } from "react";

export default function App() {
    const [squares,setSquares] = useState(Array(9).fill(null));
    const [xIsNext,setXIsNext] = useState(true);

    function handleClick(i){
        if(squares[i]||calcWinner(squares)){
            return;
        }
        const nextSquares=squares.slice();
    
        nextSquares[i]=(xIsNext?'X':'O');
        setXIsNext(!xIsNext);
        setSquares(nextSquares);
    }

    const winnerResult = calcWinner(squares);
    const winner = winnerResult?.winner;
    const winningSquares = new Set(winnerResult?.line ?? []);
    let status;
    if(winner){
        status="Winner:"+winner;
    }else{
        status="Next player:"+(xIsNext? 'X':'O');
    }


    return (
        <>
        <div className="game">
        <h1>Tic Tac Toe</h1>
        <div className="status">{status}</div>

        <div className="board">
            <div className="board-row">
                <Square value={squares[0]} highlight={winningSquares.has(0)} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} highlight={winningSquares.has(1)} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} highlight={winningSquares.has(2)} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} highlight={winningSquares.has(3)} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} highlight={winningSquares.has(4)} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} highlight={winningSquares.has(5)} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} highlight={winningSquares.has(6)} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} highlight={winningSquares.has(7)} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} highlight={winningSquares.has(8)} onSquareClick={() => handleClick(8)} />
            </div>

        </div>
        </div>

       
        </>
        
    );
}

function Square({ value, onSquareClick, highlight }) {
    return (
        <button
            className={"square" + (highlight ? " square-winning" : "")}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function calcWinner(squares){
    const lines=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    for( let i=0; i<lines.length; i++){
        const[a,b,c]=lines[i];
        if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
            return { winner: squares[a], line: lines[i] };
        }        
    }
    return null;
}

