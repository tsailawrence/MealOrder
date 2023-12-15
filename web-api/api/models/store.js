const datastore = require('../../db/mainDB');

const { getTaipeiNowStr } = require('../utils/index');

const TABLE_NAME = 'Store';

exports.getStoreByUserId = ({ userId, fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .where('userId', userId);

exports.addStoreByUserId = ({data, fields = '*' }) =>
    datastore
        .insert(
            data
        )
        .into(TABLE_NAME)

exports.getStoreByStoreId = ({ storeId, fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .where('id', storeId);

exports.getStoreByStoreIdArray = ({ theFavoriteStoresIds, fields = '*' }) =>
        datastore
            .select(fields)
            .from(TABLE_NAME)
            .whereIn('id', theFavoriteStoresIds);
    

exports.getStoreBySearch = ({ searchString, fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .where('name', searchString);

exports.getStoreByCategory = ({ categoryId, fields = '*' }) =>
        datastore
            .select(fields)
            .from(TABLE_NAME)
            .where('category', categoryId);
    

exports.getTopFavoriteStore = ({fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .limit(10).offset(0)
        .orderBy('favoriteCount', 'desc')

exports.updateStoreByStoreId = async ({ storeId, data }) =>
    datastore
        .from(TABLE_NAME)
        .where('id', storeId)
        .update(data);