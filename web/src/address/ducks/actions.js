import types from './types.js';

const changeAssetsPage = (page) => ({
    type: types.CHANGE_ADDRESS_PAGE,
    page: page
});

const changeAssetsRowsPerPage = (rowsPerPage) => ({
    type: types.CHANGE_ADDRESS_ROWS_PER_PAGE,
    rowsPerPage: rowsPerPage
});

export {
    changeAssetsPage,
    changeAssetsRowsPerPage
}