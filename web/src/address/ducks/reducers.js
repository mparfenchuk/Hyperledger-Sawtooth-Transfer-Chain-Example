import types from './types';

const initialState = {
    openForm: false,
    addressPage: 0,
    addressRowsPerPage: 5
}

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
    case types.CHANGE_FORM:{
        return {
            ...state,
            openForm: action.openForm
        }
    }
    case types.CHANGE_ADDRESS_PAGE:{
        return {
            ...state,
            addressPage: action.page
        }
    }
    case types.CHANGE_ADDRESS_ROWS_PER_PAGE:{
        return {
            ...state,
            addressRowsPerPage: action.rowsPerPage
        }
    }
    case types.CLEAR:{
        return {
           initialState
        }
    }
    default:
        return state;
    }
}
    
export default addressReducer