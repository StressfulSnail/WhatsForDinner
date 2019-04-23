import React from "react";
import PropTypes from "prop-types";
import { Paper, Button, Checkbox, FormControlLabel, TextField, withStyles } from "@material-ui/core";
import { Field, reduxForm } from 'redux-form';
// import { required, maxLength, validateEmail, validatePassword } from "../services/AccountInputValidation.js";
import TermsOfService from "./TermsOfService.js";


const styles = (theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        margin: theme.spacing.unit
    }
});

const requiredFields = (fields, values, errors) => {
    fields.forEach( (field) => {
        if ( !values[field] ) {
            errors[field] = 'Required'
        }
    });
}

const maxFields = (max, fields, values, errors) => {
    fields.forEach( (field) => {
        if (values[field] && values[field].length > max) {
            errors[field] = `Cannot be more than ${max} characters`;
        }
    });
}

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
}

const validate = (values) => {
    const errors = {};

    const MAX_NAME = 50;
    const MAX_EMAIL = 255;
    const MAX_PASSWORD = 255;

    requiredFields(
        [
            'username',
            'firstName',
            'lastName',
            'email',
            'password',
            'confirmPassword',
            'termsOfService'
        ],
        values,
        errors
    );

    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'passwords do not match';
    }

    validatePasswords(
        [
            'password',
            'confirmPassword'
        ],
        values,
        errors
    );

    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }

    maxFields(
        MAX_NAME,
        [
            'username',
            'firstName',
            'lastName',
            'middleName'
        ],
        values,
        errors
    );

    maxFields(
        MAX_PASSWORD, [ 'password', 'confirmPassword'], values, errors
    );

    if (
        values.email && values.email.length > MAX_EMAIL
    ) {
        errors.email = `Cannot be more than ${MAX_EMAIL} characters`;
    }

    return errors;
}

const renderTextField = ({
                             label,
                             input,
                             meta: { touched, invalid, error },
                             ...custom
                         }) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        variant="filled"
        margin="normal"
        {...input}
        {...custom}
    />
)

const renderPasswordField = ({
                                 label,
                                 input,
                                 meta: { touched, invalid, error },
                                 ...custom
                             }) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        type="password"
        variant="filled"
        margin="normal"
        {...input}
        {...custom}
    />
)

const renderCheckbox = ({
                            input,
                            label,
                            meta: {
                                touched,
                                invalid,
                                error
                            }
                        }) => (
    <div>
        <FormControlLabel
            control={
                <Checkbox
                    color="primary"
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                />
            }
            label={label}

        />
        {touched && invalid && <Paper>You must agree to terms of service</Paper>}
    </div>
)

const AccountForm = (props) => {

    const { handleSubmit, pristine, reset, submitting, valid, classes } = props

    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                <Field
                    name="username"
                    label="Username"
                    component={renderTextField}
                />

                <Field
                    name="firstName"
                    label="First Name"
                    component={renderTextField}
                />

                <Field
                    name="lastName"
                    label="Last Name"
                    component={renderTextField}
                />
                <Field
                    name="middleName"
                    label="Middle (Optional)"
                    component={renderTextField}
                />

                <Field
                    name="email"
                    label="Email"
                    component={renderTextField}
                />

                <Field
                    name="password"
                    label="Password"
                    component={renderPasswordField}
                />

                <Field
                    name="confirmPassword"
                    label="Confirm Password"
                    component={renderPasswordField}
                />

                <div className={classes.textField}>
                    <TermsOfService />
                </div>

                <Field
                    name="termsOfService"
                    label="I have read and agree to the terms of service"
                    component={renderCheckbox}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!valid || pristine || submitting}
                >
                    Submit
                </Button>

            </form>
        </Paper>
    );

}

AccountForm.propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const form = reduxForm({
    form: "createAccountForm",
    validate
})(AccountForm);

export default withStyles(styles)(form);
