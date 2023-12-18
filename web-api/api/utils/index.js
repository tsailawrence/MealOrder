const moment = require('moment');

exports.getTaipeiNowStr = () =>
    moment()
        .utcOffset(8)
        .format('YYYY-MM-DD HH:mm:ss');
