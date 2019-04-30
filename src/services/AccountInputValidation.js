const MAX_NAME = 50;
const MAX_EMAIL = 255;
const MAX_PASSWORD = 255;

const requiredFields = (fields, values, errors) => {
    fields.forEach( (field) => {
        if ( !values[field] ) {
            errors[field] = 'Required'
        }
    });
};

const maxFields = (max, fields, values, errors) => {
    fields.forEach( (field) => {
        if (values[field] && values[field].length > max) {
            errors[field] = `Cannot be more than ${max} characters`;
        }
    });
};

const validatePasswords = (fields, values, errors) => {
    fields.forEach( (field) => {
        let password = values[field];
        if ( password && (
            password.length < 8             // verify length
            || !password.match(/[^a-zA-Z0-9]/)  // verify at least 1 special character
            || !password.match(/[A-Z]/)         // verify at least 1 capital letter
            || !password.match(/[0-9]/)
        )
        ) {
            errors[field] = `Must be at least 8 characters and contain 1 capital letter, number, and special character`;
        }
    });
};

const validateEmail = (email) => {
    return email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
};

export {
    requiredFields,
    maxFields,
    validatePasswords,
    validateEmail,
    MAX_EMAIL,
    MAX_NAME,
    MAX_PASSWORD
}