import { useState } from "react";

export default function App() {
    const [squares,setSquares] = useState(Array(9).fill(null));
    const [xIsNext,setXIsNext] = useState(true);

    function handleClick(i){
        const nextSquares=squares.slice();
    
        nextSquares[i]=(xIsNext?'X':'O');
        setXIsNext(!xIsNext);
        setSquares(nextSquares);
    }

    const winner=calcWinner(squares);
    let status;
    if(winner){
        status="Winner:"+winner;
    }else{
        status="Next player:"+(xIsNext? 'X':'O');
    }


    return (
        <>
        <div idName="game">
        <h1>三目並べ</h1>

        <div idName="board">
            <div className="board-row">
                <square value={squares[0]}  onSquareClick={()=>handleClick(0)}/>
                <square value={squares[1]}  onSquareClick={()=>handleClick(1)}  />
                <square value={squares[2]}  onSquareClick={()=>handleClick(2)}  />
            </div>
            <div className="board-row">
                <square value={squares[3]}  onSquareClick={()=>handleClick(3)}  />
                <square value={squares[4]}  onSquareClick={()=>handleClick(4)}  />
                <square value={squares[5]}  onSquareClick={()=>handleClick(5)}  />
            </div>
            <div className="board-row">
                <square value={squares[6]}  onSquareClick={()=>handleClick(6)}  />
                <square value={squares[7]}  onSquareClick={()=>handleClick(7)}  />
                <square value={squares[8]} />
                </div>

        </div>
        </div>

       
        </>
        
    );
}

function square(square,onSquareClick) {
    return(
        <>
        <button className="square" onClick={onSquareClick}>{square}</button>
        </>
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
        if(squares[a]===squares[b]&&squares[b]&&squares[c]){
            return squares[a]
        }        
    }
    return null;
}
