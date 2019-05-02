
module.exports = {
    duplicateEmail: {
        status: 400,
        message: 'ERROR_DUPLICATE_EMAIL',
    },


    duplicateUsername: {
        status: 400,
        message: 'ERROR_DUPLICATE_USERNAME',
    },


    cantFindUsername: {
        status: 400,
        message: 'ERROR_CANNOT_FIND_USERNAME',
    },


    cantFindEmail: {
        status: 400,
        message: 'ERROR_CANNOT_FIND_EMAIL',
    },

    accountNotFound: {
        status: 404,
        message: 'ERROR_ACCOUNT_NOT_FOUND',
    },

    serverError: {
        status: 500,
        message: 'SERVER_ERROR'
    }
};