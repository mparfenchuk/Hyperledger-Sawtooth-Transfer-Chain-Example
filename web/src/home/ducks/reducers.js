import types from './types';

const initialState = {
    asset: {
        name: '',
        description: ''
    },
    keys: [],
    keysPage: 0,
    keysRowsPerPage: 5,
    assets: [],
    assetsPage: 0,
    assetsRowsPerPage: 5,
    transfers: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
    case types.SET_KEYS:{
        return {
            ...state,
            keys: action.keys
        }
    }
    case types.ADD_KEY:{
        return {
            ...state,
            keys: [
                ...state.keys
            ]
        }
    }
    case types.SET_ASSET: {
        return {
            ...state,
            asset: action.asset
        }
    }
    case types.SET_ASSETS:{
        return {
            ...state,
            assets: action.assets,
            transfers: action.transfers
        }
    }
    case types.CHANGE_KEYS_PAGE:{
        return {
            ...state,
            keysPage: action.page
        }
    }
    case types.CHANGE_KEYS_ROWS_PER_PAGE:{
        return {
            ...state,
            keysRowsPerPage: action.rowsPerPage
        }
    }
    case types.CHANGE_ASSETS_PAGE:{
        return {
            ...state,
            assetsPage: action.page
        }
    }
    case types.CHANGE_ASSETS_ROWS_PER_PAGE:{
        return {
            ...state,
            assetsRowsPerPage: action.rowsPerPage
        }
    }
    default:
        return state;
    }
}
    
export default appReducer