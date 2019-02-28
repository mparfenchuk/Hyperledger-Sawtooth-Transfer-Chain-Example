import types from './types.js';

const getKeys = () => ({
    type: types.GET_KEYS
});

const createKey = () => ({
    type: types.CREATE_KEY
});

const getAsset = (asset) => ({
    type: types.GET_ASSET,
    asset: asset
});

const changeKeysPage = (page) => ({
    type: types.CHANGE_KEYS_PAGE,
    page: page
});

const changeKeysRowsPerPage = (rowsPerPage) => ({
    type: types.CHANGE_KEYS_ROWS_PER_PAGE,
    rowsPerPage: rowsPerPage
});

const changeAssetsPage = (page) => ({
    type: types.CHANGE_ASSETS_PAGE,
    page: page
});

const changeAssetsRowsPerPage = (rowsPerPage) => ({
    type: types.CHANGE_ASSETS_ROWS_PER_PAGE,
    rowsPerPage: rowsPerPage
});

export {
    getKeys,
    createKey,
    changeKeysPage,
    changeKeysRowsPerPage,
    changeAssetsPage,
    changeAssetsRowsPerPage,
    getAsset
}