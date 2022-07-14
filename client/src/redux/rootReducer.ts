import { combineReducers } from 'redux';
import { cluesReducer } from './reducers/cluesReducer';
import { disabledLinkReducer } from './reducers/disabledLinkReducer';

export const rootReducer = combineReducers({
    cluesReducer,
    disabledLinkReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
