import { BoardState, FieldState } from '../game/types';
import styles from './Board.module.css';


export interface BoardProps {
    state: BoardState;
    onFieldClick: (x: number, y: number) => void;
}

function fieldStateToClass(state: FieldState): string {
    switch (state) {
        case FieldState.Hit:
            return 'field-hit';
        case FieldState.Miss:
            return 'field-miss';
        default:
        case FieldState.Empty:
            return 'field-empty';
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
                        className={`${styles['field']} ${styles[fieldStateToClass(field)]}`}
                        style={{
                            gridColumn: `${y + 1}`,
                            gridRow: `${x + 1}`,
                        }}
                    />
                ))
            )}
        </div>
    );
}
