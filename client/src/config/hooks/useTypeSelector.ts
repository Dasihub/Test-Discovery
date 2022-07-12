import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
