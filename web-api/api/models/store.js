const datastore = require('../../db/mainDB');

const { getTaipeiNowStr } = require('../utils/index');

const TABLE_NAME = 'Store';

exports.getStoreByUserId = ({ userId, fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)
        .where('userId', userId);