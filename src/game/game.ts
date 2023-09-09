import { computerShips } from '../data/ships';

export enum FieldState {
    Empty,
    Hit,
    Miss,
}

export interface FieldInfo {
    state: FieldState;
    shipId?: string;
}

export type BoardState = {
    size: number;
    fields: FieldState[][];
}

export enum HiddenFieldState {
    Empty,
    Ship,
}

export interface HiddenFieldInfo {
    state: HiddenFieldState;
    shipId?: string;
}

export interface GameState {
    playerBoard: BoardState;
    hiddenBoard: HiddenBoardState;
    computerShips: typeof computerShips;
};

export type HiddenBoardState = {
    size: number;
    ships: { [key: string]: { size: number, name: string } };
    fields: HiddenFieldInfo[][];
}

export interface FireResult {
    newGameState: GameState;
    hit: boolean;
    sunk?: boolean;
    shipName?: string;
};

function createEmptyBoard(size: number): BoardState {
    return {
        size: size,
        fields: Array.from({length: size}, () => Array.from({length: size}, () => FieldState.Empty)),
    };
}

function createComputerHiddenBoard(size: number): HiddenBoardState {
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
    return state;
}

export function createStartingGameState(): GameState {
    return {
        playerBoard: createEmptyBoard(10),
        hiddenBoard: createComputerHiddenBoard(10),
        computerShips: computerShips,
    };
}

export function fire(x: number, y: number, gameState: GameState): FireResult {
    const newGameState = {...gameState};

    const field = gameState.hiddenBoard.fields[x][y];
    if (field.state === HiddenFieldState.Ship) {
        newGameState.playerBoard.fields[x][y] = FieldState.Hit;

        const shipId = field.shipId as string;
        const ship = newGameState.hiddenBoard.ships[shipId];
        ship.size--;

        if (ship.size === 0) {
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
