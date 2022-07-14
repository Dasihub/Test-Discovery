import { IS_LINK } from '../types/enum';
import { IDispatchIsLink } from '../types/types';

export const disabledLinkAction = (): IDispatchIsLink => {
    return { type: IS_LINK.DISABLED };
};

export const activeLinkAction = (): IDispatchIsLink => {
    return { type: IS_LINK.ACTIVE };
};
