import { useState } from 'react';

function TicTacToe() {
    const [nextMark, setNextMark] = useState("X");
    const [squares, setSquares] = useState(emptySquares());

    function emptySquares() {
        const arr = [];
        for (let i = 0; i < 9; i++) {
            arr.push("");
        }
        return arr;
    }

    function Square({ val, mark }) {
        const [value, setValue] = useState(mark);

        function handleClick(m) {
            setValue(m);
            if (squares[val] !== "") {
                return;
            }
            setNextMark(nextMark === "X" ? "O" : "X");
            setSquares(squares.slice(0, val).concat([nextMark], squares.slice(val + 1)));
            console.log(value, nextMark, squares);
        }

        return <button onClick={() => handleClick(nextMark)} style={{
            borderColor: "black",
            margin: "10px",
            color: "red", width: "100px", height: "100px", fontSize: "24px"
        }}>
            {value}
        </button>
    }

    function calculateWinner(sq) {
        const squaresLine = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < squaresLine.length; i++) {
            const a = squaresLine[i][0];
            const b = squaresLine[i][1];
            const c = squaresLine[i][2];

            if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
                return sq[a];
            }
        }
        return null;
    }

    return <div style={{
        border: "2px solid brown", padding: "10px"
    }}   >
        <h1>tic tac toe</h1>
        <div style={{
            border: "2px solid black",
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px"
        }}>
            {
                squares.map((mark, index) => (
                    <Square key={index}
                        val={index} mark={mark} />
                ))
            }
        </div>
        <div>
            <h3>Winner</h3>
            {calculateWinner(squares)}
        </div>
        <div>
            <button onClick={() => setSquares(emptySquares())}>Reset </button>
        </div>
    </div>
}

export default TicTacToe;
