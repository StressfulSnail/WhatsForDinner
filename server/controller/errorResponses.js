
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

    serverError: {
        status: 500,
        message: 'ERROR_SERVER_ANSYC_FAILED'
    }
};