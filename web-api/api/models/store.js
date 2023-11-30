const datastore = require('../../db/mainDB');

const TABLE_NAME = 'Store';

exports.getStoreByStoreId = ({ storeId, fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .where('id', storeId);
//        .join('Menu', 'Menu.storeId', '=', TABLE_NAME+'.id')
exports.getStoreBySearch = ({ SearchString, fields = '*' }) =>
datastore
    .select(fields)
    .from(TABLE_NAME)
    .where('name', SearchString);

exports.getTopFavoriteStore = ({fields = '*' }) =>
datastore
    .select(fields)
    .from(TABLE_NAME)
    .limit(10).offset(0)
    .orderBy('favoriteCount', 'desc')
