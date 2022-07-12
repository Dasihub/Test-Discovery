import { Dispatch } from 'redux';
import { IDispatchGetClues, IResClues } from '../types/types';
import { GET_CLUES } from '../types/enum';
import { request } from '../../config/service/request';

function filter(arr: IResClues[], title: string) {
    return arr.filter((item) => item.category.title === title).sort((a, b) => a.value - b.value);
}

export const getCluesAction = () => async (dispatch: Dispatch<IDispatchGetClues>) => {
    dispatch({ type: GET_CLUES.LOADER_TRUE, ac_dc: [], state: [], hard: [], inventions: [], worlds: [] });
    const res: IResClues[] = await request('https://jservice.io/api/clues');
    const inventions = filter(res, 'inventions');
    const ac_dc = filter(res, '"ac"/"dc"');
    const state = filter(res, 'u.s. states');
    const worlds = filter(res, 'ancient worlds');
    const hard = filter(res, '"hard"');
    dispatch({ type: GET_CLUES.CLUES, inventions, ac_dc, state, worlds, hard });
    dispatch({ type: GET_CLUES.LOADER_FALSE, ac_dc: [], state: [], hard: [], inventions: [], worlds: [] });
};
