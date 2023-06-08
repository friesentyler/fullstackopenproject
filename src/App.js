import './Box.css';

import { useState } from 'react';

const Box = (props) => {
  return (
    <button className="Box" onClick={props.handler}> {props.stringName} </button>
  )
}

const NewGame = (props) => {
  return (
    <button disabled> Reset Game </button>
  )
}

const App = () => {
  const [toggle, settoggle] = useState(false);
  const [count, setcount] = useState(0);
  const [boardState, setboardState] = useState(Array(9).fill(null));

  function calculateWinner(boardState) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return boardState[a];
      }
    }
    return null;
  }

  const handleClick = (i) => {
    const boardStateCopy = boardState.slice();
    if (boardState[i] || calculateWinner(boardState)) {
      return;
    } else if (toggle === false) {
      boardStateCopy[i] = "X";
      setcount(count + 1);
      settoggle(true)
    } else {
      boardStateCopy[i] = "O";
      setcount(count + 1);
      settoggle(false)
    }
    setboardState(boardStateCopy);
  }

  const winner = calculateWinner(boardState);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (count > 8) {
    status = 'Tie, No Winner'
  } else {
    status = 'Next player: ' + (toggle ? 'O' : 'X');
  }

  return (
    <div className="center">
      <div className="status">{status}</div>
      <div>
        <Box stringName={boardState[0]} handler={() => {handleClick(0)}}/>
        <Box stringName={boardState[1]} handler={() => {handleClick(1)}}/>
        <Box stringName={boardState[2]} handler={() => {handleClick(2)}}/>
      </div>
      <div>
        <Box stringName={boardState[3]} handler={() => {handleClick(3)}}/>
        <Box stringName={boardState[4]} handler={() => {handleClick(4)}}/>
        <Box stringName={boardState[5]} handler={() => {handleClick(5)}}/>
      </div>
      <div>
        <Box stringName={boardState[6]} handler={() => {handleClick(6)}}/>
        <Box stringName={boardState[7]} handler={() => {handleClick(7)}}/>
        <Box stringName={boardState[8]} handler={() => {handleClick(8)}}/>
      </div>
      <div>
        <NewGame/>
      </div>
    </div>
  )
}

export default App;
