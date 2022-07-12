import { Dispatch } from 'redux';
import { IDispatchGetClues, IStateClues } from '../types/types';
import { GET_CLUES } from '../types/enum';
import { request } from '../../config/service/request';

function filter(arr: IStateClues[], title: string) {
    return arr.filter((item) => item.category.title === title);
}

export const getCluesAction = () => async (dispatch: Dispatch<IDispatchGetClues>) => {
    dispatch({ type: GET_CLUES.LOADER_TRUE, clues: [] });
    const res: IStateClues[] = await request('https://jservice.io/api/clues');
    // const filterClues: IStateClues[] = res.filter((item) => {
    //     if (
    //         item.category.title === 'trivia' ||
    //         item.category.title === 'baseball' ||
    //         item.category.title === 'dining out' ||
    //         item.category.title === 'inventions' ||
    //         item.category.title === 'hollywood legends'
    //     ) {
    //         return item;
    //     }
    // });
    // const sortClues: IStateClues[] = filterClues.sort((a, b) => a.value - b.value);
    const
    const filterClues = dispatch({ type: GET_CLUES.CLUES, clues: sortClues });
    dispatch({ type: GET_CLUES.LOADER_FALSE, clues: [] });
};
