import { computerShips } from '../data/ships';
import { 
    BoardState, 
    FieldState, 
    FireResult, 
    GameState, 
    HiddenBoardState, 
    HiddenFieldState,
    ShipInfo
} from './types';

function createEmptyBoard(size: number): BoardState {
    return {
        size: size,
        fields: Array.from({length: size}, () => Array.from({length: size}, () => FieldState.Empty)),
    };
}

function createComputerHiddenBoard(size: number): [HiddenBoardState, ShipInfo] {
    const shipInfo: ShipInfo = {};
    const state: HiddenBoardState = {
        size: size,
        ships: {},
        fields: Array.from({length: size}, () => Array.from({length: size}, () => {
            return { state: HiddenFieldState.Empty };
        })),
    };

    for (let i=0; i<computerShips.layout.length; i++) {
        const ship = computerShips.layout[i];
        const shipId = `ship${i}`;
        shipInfo[shipId] = {
            size: ship.positions.length,
            name: ship.ship,      
            sunk: false,      
        };

        state.ships[shipId] = {
            size: ship.positions.length,
            name: ship.ship,
        };

        for (const position of ship.positions) {
            state.fields[position[0]][position[1]] = {
                state: HiddenFieldState.Ship,
                shipId: shipId,
            };
        }
    }
    return [state, shipInfo];
}

export function createStartingGameState(): GameState {
    const [hiddenBoard, shipInfo] = createComputerHiddenBoard(10);
    return {
        playerBoard: createEmptyBoard(10),
        hiddenBoard: hiddenBoard,
        ships: shipInfo,
        scores: {
            player: 0,
            computer: 0,
        },
    };
}

export function fire(x: number, y: number, gameState: GameState): FireResult {
    const newGameState = {...gameState};

    if (gameState.playerBoard.fields[x][y] !== FieldState.Empty) {
        return {
            newGameState: newGameState,
            hit: false,
        };
    }

    const field = gameState.hiddenBoard.fields[x][y];
    if (field.state === HiddenFieldState.Ship) {
        newGameState.playerBoard.fields[x][y] = FieldState.Hit;

        const shipId = field.shipId as string;
        const ship = newGameState.hiddenBoard.ships[shipId];
        ship.size--;

        if (ship.size === 0) {
            newGameState.scores.player++;
            newGameState.ships[shipId].sunk = true;

            return {
                newGameState: newGameState,
                hit: true,
                sunk: true,
                shipName: ship.name,
            };
        } else {
            return {
                newGameState: newGameState,
                hit: true,
            };
        }
    } else {
        newGameState.playerBoard.fields[x][y] = FieldState.Miss;
        return {
            newGameState: newGameState,
            hit: false,
        };
    }
}
