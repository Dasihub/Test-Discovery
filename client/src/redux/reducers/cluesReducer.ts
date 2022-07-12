import { GET_CLUES } from '../types/enum';
import { IDispatchGetClues, IStateClues } from '../types/types';

const initialState: IStateClues = {
    loader: false,
    state: [],
    inventions: [],
    ac_dc: [],
    worlds: [],
    hard: [],
};

export const cluesReducer = (state = initialState, action: IDispatchGetClues) => {
    switch (action.type) {
        case GET_CLUES.LOADER_TRUE:
            return { ...state, loader: true };
        case GET_CLUES.CLUES:
            return {
                ...state,
                state: action.state,
                inventions: action.inventions,
                ac_dc: action.ac_dc,
                worlds: action.worlds,
                hard: action.hard,
            };
        case GET_CLUES.LOADER_FALSE:
            return { ...state, loader: false };
        default:
            return state;
    }
};
