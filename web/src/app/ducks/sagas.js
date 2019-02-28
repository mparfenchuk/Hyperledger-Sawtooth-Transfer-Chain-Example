import { all } from "redux-saga/effects";

import { keysFlow, creationKeyFlow, getStateFlow, submitUpdateFlow, getAssetInfoFlow } from '../../home/ducks/sagas';

export function* rootSaga() {
    yield all([
        keysFlow(),
        creationKeyFlow(),
        getStateFlow(),
        submitUpdateFlow(),
        getAssetInfoFlow()
    ])
}