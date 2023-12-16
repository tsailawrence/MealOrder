const datastore = require('../../db/mainDB');

const { getTaipeiNowStr } = require('../utils/index');

const TABLE_NAME = 'Menu';
const TABLE_MENU_TYPE = 'MenuType';

exports.insert = async data =>
    datastore
        .insert(
            Object.assign(data, {
                updated_time: getTaipeiNowStr('YYYY-MM-DD HH:mm:ss')
            }),
            ['id']
        )
        .into(TABLE_NAME);

exports.update = async ({ data, menuId}) =>
        datastore
            .from(TABLE_NAME)
            .where('id', menuId)
            .update(data);

exports.getMenuByStoreId = ({ storeId, fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .where('storeId', storeId);

exports.delete = async ({ menuId}) =>
    datastore
        .from(TABLE_NAME)
        .where('id', menuId)
        .del();