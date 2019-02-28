import { /*call, */put, take, select } from "redux-saga/effects";

import types from './types.js';

import { signer, BatchEncoder, TransactionEncoder } from 'sawtooth-sdk/client'

function* keysFlow(){
    while (true) {

        yield take(types.GET_KEYS);

        try {

            let resultKeys = [];
            const storedKeys = localStorage.getItem('transfer-chain.keys');
            if (storedKeys) {
                resultKeys = storedKeys.split(';').map((pair) => {
                    const separated = pair.split(',')
                    return {
                        public: separated[0],
                        private: separated[1]
                    }
                })
            }

            yield put({
                type: types.SET_KEYS, 
                keys: resultKeys
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

function* creationKeyFlow(){
    while (true) {

        yield take(types.CREATE_KEY);
        
        const keys = yield select(state => state.app.keys);

        try {

            const privateKey = signer.makePrivateKey();
            let key = {
                public: signer.getPublicKey(privateKey),
                private: privateKey
            }

            keys.push(key);
            const paired = keys.map(pair => [pair.public, pair.private].join(','))
            localStorage.setItem('transfer-chain.keys', paired.join(';'))

            yield put({
                type: types.ADD_KEY
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export {
    keysFlow,
    creationKeyFlow
}