import { BoardState, FieldState } from '../game/game';
import styles from './Board.module.css';


export interface BoardProps {
    state: BoardState;
    onFieldClick: (x: number, y: number) => void;
}

function fieldStateToString(state: FieldState): string {
    switch (state) {
        case FieldState.Empty:
            return '';
        case FieldState.Hit:
            return 'X';
        case FieldState.Miss:
            return 'o';
    }
}


export default function Board({state, onFieldClick}: BoardProps) {
    return (
        <div className={styles['board']}>
            {state.fields.map((col, y) => 
                col.map((field, x) => (
                    <div
                        key={x + y * state.size}
                        onClick={() => onFieldClick(y, x)}
                        className={styles['field']}
                        style={{
                            gridColumn: `${y + 1}`,
                            gridRow: `${x + 1}`,
                        }}
                    >
                        {fieldStateToString(field)}
                    </div>
                ))
            )}
        </div>
    );
}
