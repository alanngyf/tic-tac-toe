import React, {useState} from 'react';
import './TicTacToe.css'

const TicTacToe = () => {
    const [turn, setTurn] = useState('x');
    const [cells, setCell] = useState(Array(9).fill(""))
    const [winner, setWinner] = useState();

    const checkForWinner = (squares) => {
        let combos = {
            across : [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            down : [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            diagnol: [
                [0, 4, 8],
                [2, 4, 6]
            ]
        }
        for(let combo in combos) {
            combos[combo].forEach((pattern) => {
                if (
                    squares[pattern[0]] === "" ||
                    squares[pattern[1]] === "" ||
                    squares[pattern[2]] === "" 
                ) {
                    // do nothing here
                } else if(
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[1]] === squares[pattern[2]]
                ) {
                    // delcare the winner
                    setWinner(squares[pattern[0]]);
                    // console.log(pattern)
                    // console.log(squares[pattern])
                }
            });
        }
    }

    const handleClick = (num) => {
        if(cells[num] !== "") {
            alert("already clicked!")
            return;
        }

        let w = winner
        if(w) {
            alert("game over, "+ w +" is the winner!") 
            return;
        }
        // alert(num)
        let squares = [...cells];

        if(turn === "x") {
            squares[num] = 'x'
            setTurn('o');
        }else {
            squares[num] = 'o'
            setTurn('x');
        }

        checkForWinner(squares);
        setCell(squares);
        console.log(squares);
    }

    const handleRestart = () => {
        setWinner(null);
        setCell(Array(9).fill(""))
    }

    const Cell = ({num}) => {
        return <td onClick={() => handleClick(num)}>{cells[num]}</td>
    }

    return (
        <div className='container'>
            {/* <h1>Tic Tac Toe</h1> */}
            Turn: {turn}
            <table>
                <tbody>
                    <tr>
                        <Cell num={0} />
                        <Cell num={1} />
                        <Cell num={2} /> 
                    </tr>
                    <tr>
                        <Cell num={3} />
                        <Cell num={4} />
                        <Cell num={5} />
                    </tr>
                    <tr>
                        <Cell num={6} />
                        <Cell num={7} />
                        <Cell num={8} />
                    </tr>
                </tbody>
            </table>
            {winner && (
                <React.Fragment>
                    <p>{winner} is the winner!</p>
                    <button onClick={()=> handleRestart()}>Play again!</button>
                </React.Fragment>
            )}
            {!winner && ![...cells].includes('') && (
                <React.Fragment>
                    <p>No one wins! restart again!</p>
                    <button onClick={()=> handleRestart()}>Play again!</button>
                </React.Fragment>
            )}
        </div>
    )
}
 
export default TicTacToe;