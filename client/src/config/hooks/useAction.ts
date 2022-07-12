import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { indexActions } from '../../redux/actions';

export const useAction = () => {
    const dispatch = useDispatch();
    return bindActionCreators(indexActions, dispatch);
};
