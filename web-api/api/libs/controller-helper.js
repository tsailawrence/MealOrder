const Boom = require('boom');

const errorMessages = {
    badRequest:
        'Invalid Request, please check the API documents or contact our support team for the details.',
    unauthorized: 'Unauthorized request.',
    forbidden:
        'The request is forbidden, please try different settings or contact our support team.',
    notFound: 'Target not found.',
    exceptional:
        'Hmm, someting went wrong, please try later or contact our support team.',
    dependency:
        'Someting went wrong with our 3rd party source, please try later or contact our support team.',
    clientTimeout: 'Request Timeout'
};

exports.errorResponser = (ctx, status, message = '') => {
    ctx.status = status;
    let error = null;
    switch (status) {
        case 400:
            error = Boom.badRequest(`${message} ${errorMessages.badRequest}`);
            break;
        case 401:
            error = Boom.unauthorized(
                `${message}${message ? ' ' : ''}${errorMessages.unauthorized}`
            );
            break;
        case 403:
            error = Boom.forbidden(`${message} ${errorMessages.forbidden}`);
            break;
        case 404:
            error = Boom.notFound(`${message} ${errorMessages.notFound}`);
            break;
        case 408:
            error = Boom.clientTimeout(
                `${message} ${errorMessages.clientTimeout}`
            );
            break;
        case 409:
            error = Boom.conflict(`${message} ${errorMessages.badRequest}`);
            break;
        case 422:
            error = Boom.badData(`${message} ${errorMessages.badRequest}`);
            break;
        case 503:
            error = Boom.serverUnavailable(
                `${message} ${errorMessages.dependency}`
            );
            break;
        default:
            error = Boom.badRequest(errorMessages.badRequest);
    }

    throw error;
};
