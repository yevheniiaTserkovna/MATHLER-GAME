import React, { useState } from 'react';
import Game from './Game';

const calculation = [
  ['1', '6', '/', '2', '-', '8'],
  ['9', '0', '/', '9', '+', '7'],
  ['5', '6', '/', '7', '+', '3'],
  ['1', '8', '+', '6', '-', '3'],
  ['2', '4', '*', '2', '-', '9'],
  ['1', '1', '2', '-', '4', '7'],
  ['2', '7', '*', '3', '-', '9'],
  ['2', '8', '-', '3', '+', '7'],
  ['9', '5', '/', '5', '+', '8'],
  ['1', '3', '2', '-', '5', '9'],
];

const App = () => {
  const [game, setGame] = useState(0);
  const [complexity, setComplexity] = useState('low'); //low or high

  const startNewGame = () => {
    const newGame = game === calculation.length - 1 ? 0 : game + 1;
    setGame(newGame);
  };

  const changeComplexity = () => {
    setComplexity((prev) => {
      return prev === 'low' ? 'high' : 'low';
    });
  };

  return (
    <div>
      <Game
        calculation={calculation[game]}
        key={new Date().getTime()}
        newGameHandler={startNewGame}
        changeComplexityHandler={changeComplexity}
        complexity={complexity}
      />
    </div>
  );
};

export default App;
