
import { PlayerScores } from '../game/types';
import styles from './Scores.module.css';

export interface ScoresProps {
    scores: PlayerScores;
}

function formatScore(score: number): string {
    return score.toString().padStart(2, '0');
}

export function Scores({scores}: ScoresProps) {
    return (
        <div className={styles['scores']}>
            <div className={`${styles['score-panel']} ${styles['player-score-panel']}`}>
                <div className={styles['score']}>{formatScore(scores.player)}</div>
                <div className={styles['name']}>player 1</div>
            </div>
            <div className={`${styles['score-panel']} ${styles['computer-score-panel']}`}>
                <div className={styles['score']}>{formatScore(scores.computer)}</div>
                <div className={styles['name']}>player 2</div>
            </div>
        </div>
    );
}