import { IS_LINK } from '../types/enum';
import { IDispatchIsLink } from '../types/types';

const initialState: { link: boolean } = {
    link: false,
};

export const disabledLinkReducer = (state = initialState, action: IDispatchIsLink) => {
    switch (action.type) {
        case IS_LINK.DISABLED:
            return { link: true };
        case IS_LINK.ACTIVE:
            return { link: false };
        default:
            return state;
    }
};
