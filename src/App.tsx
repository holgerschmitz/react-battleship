import { useState } from 'react';
import styles from './App.module.css';
import Board from './components/Board';
import { createStartingGameState, fire } from './game/game';
    
function App() {
  const [game, setGame] = useState(createStartingGameState());
  const [message, setMessage] = useState('');

  function onFire(x: number, y: number) {
    const result = fire(x, y, game);
    setGame(result.newGameState);
    if (result.hit) {
      if (result.sunk) {
        setMessage(`Success! You sunk a ${result.shipName}!`);
      } else {
        setMessage('Hit!');
      }
    } else {
      setMessage('Miss');
    }
  }

  return (
    <div className={styles['App']}>
      <h1>Battleship</h1>
      <Board state={game.playerBoard} onFieldClick={onFire} />
      <p className={styles['message']}>{message}</p>
    </div>
  );
}

export default App;
