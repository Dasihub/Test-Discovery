import { Dispatch } from 'redux';
import { IDispatchAnswer, IDispatchGetClues, IResClues } from '../types/types';
import { ANSWER, CLUES } from '../types/enum';

function filter(arr: IResClues[], title: string) {
    return arr.filter((item) => item.category.title === title).sort((a, b) => a.value - b.value);
}

export const getCluesAction = () => async (dispatch: Dispatch<IDispatchGetClues>) => {
    dispatch({
        type: CLUES.LOADER_TRUE,
        ac_dcTopic: [],
        stateTopic: [],
        hardTopic: [],
        inventionsTopic: [],
        worldsTopic: [],
    });
    const res: Response = await fetch('https://jservice.io/api/clues');
    const data: IResClues[] = await res.json();
    const inventionsTopic = filter(data, 'inventions');
    const ac_dcTopic = filter(data, '"ac"/"dc"');
    const stateTopic = filter(data, 'u.s. states');
    const worldsTopic = filter(data, 'ancient worlds');
    const hardTopic = filter(data, '"hard"');
    dispatch({ type: CLUES.GET_CLUES, inventionsTopic, ac_dcTopic, stateTopic, worldsTopic, hardTopic });
    dispatch({
        type: CLUES.LOADER_FALSE,
        ac_dcTopic: [],
        stateTopic: [],
        hardTopic: [],
        inventionsTopic: [],
        worldsTopic: [],
    });
};

export const answersAction = (id: number | null, title: string): IDispatchAnswer => {
    return {
        type: ANSWER.ANSWER,
        id,
        title,
    };
};

export const clearCluesAction = () => {
    return {
        type: CLUES.CLEAR_CLUES,
    };
};
