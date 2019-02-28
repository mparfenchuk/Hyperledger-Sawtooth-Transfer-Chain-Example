import types from './types.js';

const getKeys = () => ({
    type: types.GET_KEYS
});

const createKey = () => ({
    type: types.CREATE_KEY
});

const changePage = (page) => ({
    type: types.CHANGE_PAGE,
    page: page
});

const changeRowsPerPage = (rowsPerPage) => ({
    type: types.CHANGE_ROWS_PER_PAGE,
    rowsPerPage: rowsPerPage
});

export {
    getKeys,
    createKey,
    changePage,
    changeRowsPerPage
}