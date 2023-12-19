const datastore = require('../../db/mainDB');

const { getTaipeiNowStr } = require('../utils/index');

const TABLE_NAME = 'MenuType';

exports.getMenuTypeByStoreId = ({ storeId, fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .where('storeId', storeId);

exports.insert = async data =>
    datastore
        .insert(
            Object.assign(data, {
                updated_time: getTaipeiNowStr('YYYY-MM-DD HH:mm:ss')
            }),
            ['id']
        )
        .into(TABLE_NAME);

exports.update =  async ({ menuTypeId, data }) =>
    datastore
        .from(TABLE_NAME)
        .where('id', menuTypeId)
        .update(data);

exports.delete =  async ({ menuTypeId }) =>
        datastore
            .from(TABLE_NAME)
            .where('id', menuTypeId)
            .del();