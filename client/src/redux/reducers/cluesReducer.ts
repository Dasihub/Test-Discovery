import { GET_CLUES } from '../types/enum';
import { IDispatchGetClues, IStateClues } from '../types/types';

const initialState: IStateClues = {
    loader: false,
    stateTopic: [],
    inventionsTopic: [],
    ac_dcTopic: [],
    worldsTopic: [],
    hardTopic: [],
};

export const cluesReducer = (state = initialState, action: IDispatchGetClues) => {
    switch (action.type) {
        case GET_CLUES.LOADER_TRUE:
            return { ...state, loader: true };
        case GET_CLUES.CLUES:
            return {
                ...state,
                stateTopic: action.stateTopic,
                inventionsTopic: action.inventionsTopic,
                ac_dcTopic: action.ac_dcTopic,
                worldsTopic: action.worldsTopic,
                hardTopic: action.hardTopic,
            };
        case GET_CLUES.LOADER_FALSE:
            return { ...state, loader: false };
        default:
            return state;
    }
};
