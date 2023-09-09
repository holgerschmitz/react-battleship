import { computerShips } from "../data/ships";

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

export interface HiddenBoardState {
    size: number;
    ships: { [key: string]: { size: number, name: string } };
    fields: HiddenFieldInfo[][];
}

export interface ShipInfo {
    [key: string]: {
        size: number;
        name: string;
        sunk: boolean;
    }
}

export interface PlayerScores {
    player: number;
    computer: number;
}

export interface GameState {
    playerBoard: BoardState;
    hiddenBoard: HiddenBoardState;
    ships: ShipInfo;
    scores: PlayerScores
};

export interface FireResult {
    newGameState: GameState;
    hit: boolean;
    sunk?: boolean;
    shipName?: string;
};
