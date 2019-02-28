import types from './types';

const initialState = {
    keys: [],
    page: 0,
    rowsPerPage: 5
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
    case types.CHANGE_PAGE:{
        return {
            ...state,
            page: action.page
        }
    }
    case types.CHANGE_ROWS_PER_PAGE:{
        return {
            ...state,
            rowsPerPage: action.rowsPerPage
        }
    }
    default:
        return state;
    }
}
    
export default appReducer