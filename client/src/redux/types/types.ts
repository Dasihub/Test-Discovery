import { GET_CLUES } from './enum';

export interface IResClues {
    id: number;
    answer: string;
    question: string;
    value: number;
    airdate: string;
    created_at: string;
    updated_at: string;
    category_id: number;
    game_id: null;
    invalid_count: null;
    category: {
        id: number;
        title: string;
        created_at: string;
        updated_at: string;
        clues_count: number;
    };
}

export interface IStateClues {
    inventions: IResClues[];
    ac_dc: IResClues[];
    state: IResClues[];
    worlds: IResClues[];
    hard: IResClues[];
    loader?: boolean;
}

export interface IDispatchGetClues extends IStateClues {
    type: GET_CLUES.CLUES | GET_CLUES.LOADER_FALSE | GET_CLUES.LOADER_TRUE;
    // clues: IResClues[];
}
