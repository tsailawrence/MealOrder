/* eslint-disable no-nested-ternary */
const counterFunc = require('passthrough-counter');
const humanize = require('humanize-number');
const bytes = require('bytes');
const chalk = require('chalk');
const util = require('util');

// color map.
const colorCodes = {
    7: 'magenta',
    5: 'red',
    4: 'yellow',
    3: 'cyan',
    2: 'green',
    1: 'green',
    0: 'yellow'
};

/**
 * Show the response time in a human readable format.
 * In milliseconds if less than 10 seconds,
 * in seconds otherwise.
 */
function time(start) {
    const delta = Date.now() - start;
    return humanize(
        delta < 10000 ? `${delta}ms` : `${Math.round(delta / 1000)}s`
    );
}

// Log helper.
function log(print, ctx, start, length_, err, event) {
    // get the status code of the response
    const status = err
        ? err.isBoom
            ? err.output.statusCode
            : err.status || 500
        : ctx.status || 404;

    // set the color of the status code;
    const s = status / 100 || 0;
    // eslint-disable-next-line no-prototype-builtins
    const color = colorCodes.hasOwnProperty(s) ? colorCodes[s] : colorCodes[0];

    // get the human readable response length
    const length = [204, 205, 304].includes(status)
        ? ''
        : length_ == null
        ? '-'
        : bytes(length_).toLowerCase();

    const upstream = err
        ? chalk.red('xxx')
        : event === 'close'
        ? chalk.yellow('-x-')
        : chalk.gray('-->');

    print(
        `  ${upstream} ${chalk.gray('%s')} ${chalk.bold('%s')} ${chalk.gray(
            '%s'
        )} ${chalk[color]('%s')} ${chalk.gray('%s')} ${chalk.gray('%s')}`,
        ctx.uuid,
        ctx.method,
        ctx.originalUrl,
        status,
        time(start),
        length
    );
}

module.exports = options => {
    // print to console helper.
    const print = (() => {
        let transporter;
        if (typeof options === 'function') {
            transporter = options;
        } else if (options && options.transporter) {
            ({ transporter } = options);
        }

        // eslint-disable-next-line func-names
        return function printFunc(...args) {
            const string = util.format(...args);
            if (transporter) transporter(string, args);
            /* eslint-disable no-console */ else console.log(...args);
        };
    })();

    // eslint-disable-next-line func-names
    return async function logger(ctx, next) {
        // request
        const start = ctx[Symbol.for('request-received.startTime')]
            ? ctx[Symbol.for('request-received.startTime')].getTime()
            : Date.now();
        print(
            `  ${chalk.gray('<--')} ${chalk.gray('%s')} ${chalk.bold(
                '%s'
            )} ${chalk.gray('%s')}`,
            ctx.uuid,
            ctx.method,
            ctx.originalUrl
        );

        try {
            await next();
        } catch (err) {
            // log uncaught downstream errors
            log(print, ctx, start, null, err);
            throw err;
        }

        // calculate the length of a streaming response
        // by intercepting the stream with a counter.
        // only necessary if a content-length header is currently not set.
        const {
            body,
            response: { length }
        } = ctx;
        let counter;
        if (length === null && body && body.readable) {
            ctx.body = body
                .pipe((counter = counterFunc()))
                .on('error', ctx.onerror);
        }

        // log when the response is finished or closed,
        // whichever happens first.
        const { res } = ctx;
        // eslint-disable-next-line no-use-before-define
        const onfinish = done.bind(null, 'finish');
        // eslint-disable-next-line no-use-before-define
        const onclose = done.bind(null, 'close');

        function done(event) {
            res.removeListener('finish', onfinish);
            res.removeListener('close', onclose);
            log(
                print,
                ctx,
                start,
                counter ? counter.length : length,
                null,
                event
            );
        }

        res.once('finish', onfinish);
        res.once('close', onclose);
    };
};
