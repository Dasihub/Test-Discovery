import { ANSWER, CLUES, IS_LINK } from './enum';

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
    isAnswer: string;
}

export interface IStateClues {
    inventionsTopic: IResClues[];
    ac_dcTopic: IResClues[];
    stateTopic: IResClues[];
    worldsTopic: IResClues[];
    hardTopic: IResClues[];
    loader?: boolean;
}

export interface IDispatchGetClues extends IStateClues {
    type: CLUES.GET_CLUES | CLUES.LOADER_FALSE | CLUES.LOADER_TRUE;
    // clues: IResClues[];
}

export interface IDispatchAnswer {
    type: ANSWER.ANSWER;
    id: number | null;
    title: string;
}

export interface IDispatchClear {
    type: CLUES.CLEAR_CLUES;
}

export interface IDispatchIsLink {
    type: IS_LINK.DISABLED | IS_LINK.ACTIVE;
}
