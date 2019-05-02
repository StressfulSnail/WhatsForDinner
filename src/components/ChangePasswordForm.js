import React from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";
import { Field, reduxForm } from 'redux-form';

import { renderPasswordField } from "./common/InputFields";
import {
    requiredFields, maxFields, validatePasswords, MAX_PASSWORD
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
            'newPassword',
            'confirmNewPassword'
        ],
        values,
        errors
    );

    if (values.newPassword !== values.confirmNewPassword) {
        errors.confirmNewPassword = 'passwords do not match';
    }

    validatePasswords(
        [
            'newPassword',
            'confirmPassword'
        ],
        values,
        errors
    );

    maxFields(
        MAX_PASSWORD, [ 'newPassword', 'confirmNewPassword'], values, errors
    );


    return errors;
};


const ChangePasswordForm = (props) => {

    const { handleSubmit, pristine, reset, submitting, valid, classes } = props;

    return (

        <form onSubmit={handleSubmit}>

            <Field
                name="newPassword"
                label="New Password"
                component={renderPasswordField}
            />

            <br/>

            <Field
                name="confirmNewPassword"
                label="Confirm New Password"
                component={renderPasswordField}
            />

            <br/>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!valid || pristine || submitting}
            >
                Change Password
            </Button>

        </form>
    );

};

ChangePasswordForm.propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const form = reduxForm({
    form: "changePasswordForm",
    validate
})(ChangePasswordForm);

export default withStyles(styles)(form);
