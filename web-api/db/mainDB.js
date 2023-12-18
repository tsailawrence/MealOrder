const config = require('config');

const dbConfig = config.get('db.mainDB');

const knex = require('knex')({
    client: dbConfig.client,
    connection: {
        charset: 'utf8mb4',
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        port: dbConfig.port,
        timezone: '+08:00',
        dateStrings: true,
        connTimeout: dbConfig.ConnectionTimeoutInSecond * 1000
    },
    acquireConnectionTimeout: dbConfig.ConnectionTimeoutInSecond * 1000,
    pool: {
        // acquire promises are rejected after this many milliseconds
        // if a resource cannot be acquired
        acquireTimeoutMillis: 30000,

        // create operations are cancelled after this many milliseconds
        // if a resource cannot be acquired
        createTimeoutMillis: 30000,

        // destroy operations are awaited for at most this many milliseconds
        // new resources will be created after this timeout
        destroyTimeoutMillis: 5000,

        // free resouces are destroyed after this many milliseconds
        idleTimeoutMillis: 30000,

        // how often to check for idle resources to destroy
        reapIntervalMillis: 1000,

        // how long to idle after failed create before trying again
        createRetryIntervalMillis: 200,

        // If true, when a create fails, the first pending acquire is
        // rejected with the error. If this is false (the default) then
        // create is retried until acquireTimeoutMillis milliseconds has
        // passed.
        propagateCreateError: false
    },
    useNullAsDefault: true
});

module.exports = knex;
