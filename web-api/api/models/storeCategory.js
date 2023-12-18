const datastore = require('../../db/mainDB');

const TABLE_NAME = 'StoreCategory';

exports.getStoreCategory = ({fields = '*' }) =>
    datastore
        .select(fields)
        .from(TABLE_NAME)