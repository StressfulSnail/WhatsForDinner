import React from "react";
import PropTypes from "prop-types";
import { Paper, Button, withStyles } from "@material-ui/core";
import { Field, reduxForm } from 'redux-form';
import { renderTextField, renderPasswordField, renderCheckbox } from "./common/InputFields";
import {
    requiredFields, maxFields, validateEmail, MAX_NAME, MAX_PASSWORD, MAX_EMAIL
} from "../services/AccountInputValidation";

import { connect } from "react-redux";


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
            'email'
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

    if (
        values.email && values.email.length > MAX_EMAIL
    ) {
        errors.email = `Cannot be more than ${MAX_EMAIL} characters`;
    }

    return errors;
};


const EditAccountForm = (props) => {

    const { handleSubmit, pristine,submitting, valid, classes } = props;

    return (
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

            <br/>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!valid || pristine || submitting}
            >
                Submit
            </Button>

        </form>
    );

};

EditAccountForm.propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        initialValues: state.account.accountData
    }
};

const form = reduxForm({
    form: "editAccountForm",
    validate,
    enableReinitialize: true
})(EditAccountForm);

const connected = connect(mapStateToProps, null)(form);

export default withStyles(styles)(connected);
