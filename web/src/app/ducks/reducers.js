import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form'

import appReducer from '../../home/ducks/reducers';
import addressReducer from '../../address/ducks/reducers';

const reducers = (history) => combineReducers({
    router: connectRouter(history),
    form: formReducer,
    app: appReducer,
    address: addressReducer
})

export default reducers;