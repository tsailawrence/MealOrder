const datastore = require('../../db/mainDB');

const TABLE_NAME = 'FavoriteStore';
    
exports.getUserFavoriteStoreId = ({userId, fields = 'storeID'  }) =>
datastore
    .select(fields)
    .from(TABLE_NAME)
    .where('userId', userId);
    
exports.addUserFavoriteStoreId = ({userId, storeId , fields = 'storeID'  }) =>
    datastore
        .insert(
            {userId,storeId}
        )
        .into(TABLE_NAME);