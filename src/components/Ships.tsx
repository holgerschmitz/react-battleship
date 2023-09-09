
import { PlayerScores, ShipInfo } from '../game/types';
import styles from './Ships.module.css';

export interface ShipsProps {
    ships: ShipInfo;
}

function getShipIcon(name: string): string {
    switch (name) {
        case 'carrier':
            return '/react-battleship/carrier.png';
        case 'battleship':
            return '/react-battleship/battleship.png';
        case 'cruiser':
            return '/react-battleship/cruiser.png';
        case 'submarine':
            return '/react-battleship/submarine.png';
        case 'destroyer':
            return '/react-battleship/destroyer.png';
        default:
            throw new Error(`Unknown ship name: ${name}`);
    }
}


export function Ships({ships}: ShipsProps) {
    const shipsSorted = Object.values(ships).sort((a, b) => b.size - a.size);
    return (
        <div className={styles['ships']}>
            {shipsSorted.map((ship) => (
                <div className={styles['ship-row']}>
                    <div className={styles['ship-icon']}>
                        <img src={getShipIcon(ship.name)} />
                    </div>
                    <div className={styles['hit-miss']}>
                        {ship.sunk ?
                            Array(ship.size).fill(0).map((_) => (<div className={styles['hit']} />)) :
                            Array(ship.size).fill(0).map((_) => (<div className={styles['miss']} />))
                        }
                    </div>
                </div>
            ))}
        </div>
    );
}