const cluster = require('cluster');
const server = require('./api/app');

if (cluster.isMaster) {
    const api = server();
    const HOST = process.env.HOST || '0.0.0.0';
    const PORT = process.env.PORT || 3001;

    console.info(`Launch on ${PORT}`);

    api.listen(PORT, HOST).on('error', err => {
        console.error(err);
    });
} //
