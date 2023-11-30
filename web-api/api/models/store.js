const datastore = require('../../db/mainDB');

const { getTaipeiNowStr } = require('../utils/index');

const TABLE_NAME = 'Store';

exports.getStoreByUserId = ({ userId, fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .where('userId', userId);

exports.getStoreByStoreId = ({ storeId, fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .where('id', storeId);

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
