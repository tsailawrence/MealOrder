const Boom = require('@hapi/boom');

const generalErrorMessage = {
    badRequest:
        'Invalid Request, please check the API documents or contact our support team for the details.',
    unauthorized: 'Unauthorized request.',
    forbidden:
        'The request is forbidden, please try different settings or contact our support team.',
    notFound: 'Target not found.',
    serverUnavailable:
        'Something went wrong with our 3rd party source, please try later or contact our support team.'
};

const errorHandler = ({ error, type = 'badRequest' }) => {
    const handler = Boom[type] || Boom.badRequest;
    const message =
        error ||
        (generalErrorMessage?.[type] ?? generalErrorMessage.badRequest);
    const errorObj = typeof error === 'object' ? error : { message };

    return handler(JSON.stringify(errorObj));
};

exports.rejectTheRequest = ({ status, message = '' }) => {
    const errorMap = {
        400: 'badRequest',
        401: 'unauthorized',
        403: 'forbidden',
        404: 'notFound',
        422: 'badData',
        503: 'serverUnavailable'
    };

    throw errorHandler({
        error: message,
        type: errorMap[status] || 'badRequest'
    });
};
