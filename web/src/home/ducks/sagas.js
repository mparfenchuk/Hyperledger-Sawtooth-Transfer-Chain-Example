import { call, put, take, select } from "redux-saga/effects";
import { startSubmit, stopSubmit, reset } from 'redux-form';
import { push } from 'connected-react-router';
import ipfs from '../../app/ducks/ipfs';

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

            yield put({
                type: types.GET_STATE
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

function* getStateFlow(){
    while (true) {

        yield take(types.GET_STATE);
        
        try {

            const getStateResult = yield fetch('/state?address=19d832', {
                method: 'GET',
            }).then(response => response.json());

            const result = getStateResult.data.reduce((processed, datum) => {
                if (datum.data !== '') {
                  const parsed = JSON.parse(atob(datum.data))
                  if (datum.address[7] === '0') processed.assets.push(parsed)
                  if (datum.address[7] === '1') processed.transfers.push(parsed)
                }
                return processed
            }, {assets: [], transfers: []})

            yield put({
                type: types.SET_ASSETS, 
                assets: result.assets,
                transfers: result.transfers
            })

        } catch (error) {
            console.log(error.message);
        }
    }
}

function* getAssetInfoFlow(){
    while (true) {

        const { asset } = yield take(types.GET_ASSET);

        try {

            let rawAsset = yield call(ipfs.cat, asset);
            let result = JSON.parse(rawAsset);
           
            yield put({type: types.SET_ASSET, asset: result})

        } catch (error) {
            console.log(error.message);
        }

    }
}

function* submitUpdateFlow(){
    while (true) {

        const { action, owner, object, privateKey, formId } = yield take(types.SUBMIT_UPDATE);
        
        let asset = object;

        if (action === 'create') {
            let content = ipfs.types.Buffer.from(JSON.stringify(object));
            let results = yield call(ipfs.files.add, content);
            asset = results[0].hash; 
        }
    
        const payload = { action, asset, owner};

        yield put(startSubmit(formId))

        try {

            const transaction = new TransactionEncoder(privateKey, {
                inputs: ['19d832'],
                outputs: ['19d832'],
                familyName: 'transfer-chain',
                familyVersion: '0.0',
                payloadEncoding: 'application/json',
                payloadEncoder: p => Buffer.from(JSON.stringify(p))
            }).create(payload)
            
            const batchBytes = new BatchEncoder(privateKey).createEncoded(transaction)
            
            const submitUpdateResult = yield fetch('/batches?wait', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/octet-stream'
                    },
                    body: batchBytes
            }).then(response => response.json())

            if (!submitUpdateResult.link){
                throw new Error("No connection");
            }

            yield put(reset(formId))
            yield put(stopSubmit(formId))
            
            yield put(push("/"))
        } catch (error) {
            console.log(error.message);
            yield put(stopSubmit(formId, { _error: error.message }))
        }
    }
}

export {
    keysFlow,
    creationKeyFlow,
    getStateFlow,
    submitUpdateFlow,
    getAssetInfoFlow
}