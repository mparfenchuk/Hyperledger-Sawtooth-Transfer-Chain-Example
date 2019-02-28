import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import createSagaMiddleware from "redux-saga";

import reducers from './reducers'
import { rootSaga } from "./sagas";

const getBasename = () => {
    return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

export const history = createBrowserHistory({basename: getBasename()})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const routingMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();


const store = createStore(
    reducers(history),
    composeEnhancers(
        applyMiddleware(
            routingMiddleware,
            sagaMiddleware
        )
    )
)

sagaMiddleware.run(rootSaga);

export default store;