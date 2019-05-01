import React from "react";
import PropTypes from "prop-types";
import { Paper, Button, withStyles } from "@material-ui/core";
import { Field, reduxForm } from 'redux-form';
import TermsOfService from "./TermsOfService.js";
import { renderTextField, renderPasswordField, renderCheckbox } from "./common/InputFields";
import {
    requiredFields, maxFields, validatePasswords, validateEmail, MAX_NAME, MAX_PASSWORD, MAX_EMAIL
} from "../services/AccountInputValidation";


const styles = (theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        margin: theme.spacing.unit
    }
});


const validate = (values) => {
    const errors = {};

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

    if ( validateEmail(values.email) ) {
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
};


const CreateAccountForm = (props) => {

    const { handleSubmit, pristine, reset, submitting, valid, classes } = props;

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

                <br/>

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

                <br/>

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

};

CreateAccountForm.propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const form = reduxForm({
    form: "createAccountForm",
    validate
})(CreateAccountForm);

export default withStyles(styles)(form);
