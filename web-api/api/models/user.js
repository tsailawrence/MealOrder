const datastore = require('../../db/mainDB');

const { getTaipeiNowStr } = require('../utils/index');

const TABLE_NAME = 'User';

exports.AUTHENTICATION_METHOD = {
    LINE: 'line',
    GOOGLE: 'google'
};

exports.TYPE = {
    MERCHANT: 'merchant',
    EMPLOYEE: 'employee'
};

exports.getUserByToken = ({ token, fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .where('token', token);

exports.getUserByUserId = ({ userId, fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .where('userId', userId);

exports.getUserBySenderId = ({ senderId, fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .where('senderId', senderId);

exports.getUserById = ({ id, fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .where('id', id);

exports.getVerifiedUser = ({ userId, token, fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .where('userId', userId)
        .andWhere('token', token);

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
        .where('userId', userId);

exports.updateById = async ({ id, data }) =>
    datastore
        .update(data)
        .from(TABLE_NAME)
        .where('id', id);

exports.deleteByUserId = async ({ userId, data }) =>
    datastore
        .del()
        .from(TABLE_NAME)
        .where('userId', userId);