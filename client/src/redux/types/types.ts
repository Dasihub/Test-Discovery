import { GET_CLUES } from './enum';

export interface IStateClues {
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

export interface IDispatchGetClues {
    type: GET_CLUES.CLUES | GET_CLUES.LOADER_FALSE | GET_CLUES.LOADER_TRUE;
    clues: IStateClues[];
}
