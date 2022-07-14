import { ANSWER, CLUES } from '../types/enum';
import { IDispatchAnswer, IDispatchClear, IDispatchGetClues, IStateClues } from '../types/types';

const initialState: IStateClues = {
    loader: false,
    stateTopic: [],
    inventionsTopic: [],
    ac_dcTopic: [],
    worldsTopic: [],
    hardTopic: [],
};

export const cluesReducer = (state = initialState, action: IDispatchGetClues | IDispatchAnswer | IDispatchClear) => {
    switch (action.type) {
        case CLUES.LOADER_TRUE:
            return { ...state, loader: true };
        case CLUES.GET_CLUES:
            return {
                ...state,
                stateTopic: action.stateTopic,
                inventionsTopic: action.inventionsTopic,
                ac_dcTopic: action.ac_dcTopic,
                worldsTopic: action.worldsTopic,
                hardTopic: action.hardTopic,
            };
        case CLUES.LOADER_FALSE:
            return { ...state, loader: false };
        case ANSWER.ANSWER:
            return {
                ...state,
                stateTopic: state.stateTopic.map((item) =>
                    item.id === action.id ? { ...item, isAnswer: action.title } : item,
                ),
                inventionsTopic: state.inventionsTopic.map((item) =>
                    item.id === action.id ? { ...item, isAnswer: action.title } : item,
                ),
                ac_dcTopic: state.ac_dcTopic.map((item) =>
                    item.id === action.id ? { ...item, isAnswer: action.title } : item,
                ),
                worldsTopic: state.worldsTopic.map((item) =>
                    item.id === action.id ? { ...item, isAnswer: action.title } : item,
                ),
                hardTopic: state.hardTopic.map((item) =>
                    item.id === action.id ? { ...item, isAnswer: action.title } : item,
                ),
            };
        case CLUES.CLEAR_CLUES:
            return { ...state, stateTopic: [], ac_dcTopic: [], hardTopic: [], worldsTopic: [], inventionsTopic: [] };
        default:
            return state;
    }
};
