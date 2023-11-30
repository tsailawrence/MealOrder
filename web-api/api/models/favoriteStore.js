const datastore = require('../../db/mainDB');

const TABLE_NAME = 'favoriteStore';

exports.getUserFavoriteStore = ({userId, fields = '*' }) =>
datastore
    .select(fields)
    .from(TABLE_NAME)
    .join('store', 'favoriteStore.storeId', '=', 'store.storeId')
    .where('userId', userId);
    