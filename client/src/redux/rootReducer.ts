import { combineReducers } from 'redux';
import { cluesReducer } from './reducers/cluesReducer';

export const rootReducer = combineReducers({
    cluesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
