import { useState } from 'react';
import styles from './App.module.css';
import Board from './components/Board';
import { createStartingGameState, fire } from './game/game';
import { Scores } from './components/Scores';
import { Ships } from './components/Ships';
    
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
    <div className={styles['app']}>
      <div className={styles['app-layout']} >
        <div className={styles['game-info']}>
            <Scores scores={game.scores}/>
            <Ships ships={game.ships}/>
        </div>
        <Board state={game.playerBoard} onFieldClick={onFire} />
      </div>
    </div>
  );
}

export default App;
