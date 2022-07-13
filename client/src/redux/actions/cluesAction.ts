import { Dispatch } from 'redux';
import { IDispatchAnswer, IDispatchGetClues, IResClues } from '../types/types';
import { ANSWER, GET_CLUES } from '../types/enum';
import { request } from '../../config/service/request';

function filter(arr: IResClues[], title: string) {
    return arr.filter((item) => item.category.title === title).sort((a, b) => a.value - b.value);
}

export const getCluesAction = () => async (dispatch: Dispatch<IDispatchGetClues>) => {
    dispatch({
        type: GET_CLUES.LOADER_TRUE,
        ac_dcTopic: [],
        stateTopic: [],
        hardTopic: [],
        inventionsTopic: [],
        worldsTopic: [],
    });
    const res: IResClues[] = await request('https://jservice.io/api/clues');
    const inventionsTopic = filter(res, 'inventions');
    const ac_dcTopic = filter(res, '"ac"/"dc"');
    const stateTopic = filter(res, 'u.s. states');
    const worldsTopic = filter(res, 'ancient worlds');
    const hardTopic = filter(res, '"hard"');
    dispatch({ type: GET_CLUES.CLUES, inventionsTopic, ac_dcTopic, stateTopic, worldsTopic, hardTopic });
    dispatch({
        type: GET_CLUES.LOADER_FALSE,
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
