import React from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";
import { Field, reduxForm } from 'redux-form';

import { renderTextField } from "./common/InputFields";
import {
    requiredFields, validateEmail, MAX_EMAIL
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
            'email'
        ],
        values,
        errors
    );


    if ( validateEmail(values.email) ) {
        errors.email = 'Invalid email address'
    }

    if (
        values.email && values.email.length > MAX_EMAIL
    ) {
        errors.email = `Cannot be more than ${MAX_EMAIL} characters`;
    }

    return errors;
};


const RecoverAccountForm = (props) => {

    const { handleSubmit, pristine, submitting, valid } = props;

    return (

        <form onSubmit={handleSubmit}>

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
                Get new password!
            </Button>

        </form>
    );

};

RecoverAccountForm.propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const form = reduxForm({
    form: "recoverAccountForm",
    validate
})(RecoverAccountForm);

export default withStyles(styles)(form);
