import { GET_CLUES } from '../types/enum';
import { IDispatchGetClues, IStateClues } from '../types/types';

const initialState: { loader: boolean; clues: IStateClues[] } = {
    loader: false,
    clues: [],
};

export const cluesReducer = (state = initialState, action: IDispatchGetClues) => {
    switch (action.type) {
        case GET_CLUES.LOADER_TRUE:
            return { ...state, loader: true };
        case GET_CLUES.CLUES:
            return { ...state, clues: action.clues };
        case GET_CLUES.LOADER_FALSE:
            return { ...state, loader: false };
        default:
            return state;
    }
};
