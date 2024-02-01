import { useState } from 'react'

function Square({ value, onSquareClick, isWinningSquare }) {

  //преобретение цвета
  const squareStyle = {
    backgroundColor: isWinningSquare ? 'Pink' : 'Lavender'
  }

  return (
    <button className="square" style={squareStyle} onClick={onSquareClick}>
      {value}
    </button>
  )
}

function Board({ xIsNext, squares, onPlay, cellColor }) {
  function renderSquare(i) {
    const isWinningSquare = winningSquares && winningSquares.includes(i)
    return (
      <Square
        key={i}
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        isWinningSquare={isWinningSquare}
      />
    )
  }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }
    onPlay(nextSquares)
  }



  const winner = calculateWinner(squares)
  let status
  let winningSquares
  if (winner) {
    status = 'Winner: ' + winner.player
    winningSquares = winner.line
  } else {
    if (isBoardFull(squares)) {
      status = 'Draw'
    } else {

      status = 'Next player -> ' + (xIsNext ? 'X' : 'O')
    }
  }

  const boardStyle = {
    backgroundColor: cellColor
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">

        {/* {[...Array(boardSize).keys()].map((row) => {
          return Array.from({ length: boardSize }, (_, col) => (
            <Square key={row * boardSize + col} value={squares[row * boardSize + col]} onSquareClick={() => handleClick(row * boardSize + col)} />
          ))
        })} */}

        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          isWinningSquare={winningSquares && winningSquares.includes(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          isWinningSquare={winningSquares && winningSquares.includes(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          isWinningSquare={winningSquares && winningSquares.includes(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          isWinningSquare={winningSquares && winningSquares.includes(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          isWinningSquare={winningSquares && winningSquares.includes(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          isWinningSquare={winningSquares && winningSquares.includes(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          isWinningSquare={winningSquares && winningSquares.includes(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          isWinningSquare={winningSquares && winningSquares.includes(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          isWinningSquare={winningSquares && winningSquares.includes(8)}
        />
      </div>
      {/* <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div> */}


    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const [sortAscending, setSortAscending] = useState(true)
  const [boardSize, setBoardSize] = useState(3)

  // const [cellColor, setCellColor] = useState('Lavender')

  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  function toggleSortOrder() {
    setSortAscending(!sortAscending)
  }
  // function changeCellColor() {
  //   const newColor = prompt('Enter a color name or hexadecimal code:', 'lavender')
  //   if (newColor) {
  //     setCellColor(newColor)
  //   }
  // }


  function handleRestart() {

    setHistory([Array(boardSize ** 2).fill(null)])
    setCurrentMove(0)

  }
  // function increaseBoardSize() {
  //   setBoardSize(boardSize + 1)
  //   setHistory([Array((boardSize + 1) ** 2).fill(null)])
  //   setCurrentMove(0)
  // }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? 'Go to move #' + move : 'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  if (!sortAscending) {
    moves.reverse()
  }

  return (
    <div className="game">
      <div
        className="game-board">

        <Board

          //boardSize={boardSize}


          xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}
          winningSquares={calculateWinner(currentSquares)?.line}

        //cellColor={cellColor}
        />
      </div>
      <div className="game-info">

        <button onClick={toggleSortOrder}> Sort Order</button>

        <ol>{moves}</ol>
        <button onClick={handleRestart}>Restart</button>
        <br>
        </br>
        {/* <button onClick={changeCellColor}>Change Cell Color</button> */}

        <br></br>
        {/* <button onClick={increaseBoardSize}>Increase Grid Size</button> */}
        {/* Через функцию или через добавление в коде */}

      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        line: [a, b, c]
      }
    }
  }
  return null
}
function isBoardFull(squares) {
  return squares.every(square => square !== null)
}