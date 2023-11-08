const datastore = require('../../db/mainDB');
const { getTaipeiNowStr } = require('../utils/index');

const TABLE_NAME = 'favorite_city';

exports.getByUserId = ({ userId, fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .where('user_id', userId);

exports.insert = async data =>
    datastore
        .insert(
            Object.assign(data, {
                updated_time: getTaipeiNowStr('YYYY-MM-DD HH:mm:ss')
            }),
            ['id']
        )
        .into(TABLE_NAME);

exports.updateByUserId = async ({ userId, data }) =>
    datastore
        .update(data)
        .from(TABLE_NAME)
        .where('user_id', userId);

exports.deleteByUserId = async ({ userId, data }) =>
    datastore
        .del()
        .from(TABLE_NAME)
        .where('user_id', userId);