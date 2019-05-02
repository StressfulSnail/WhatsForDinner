import React from "react";
import PropTypes from "prop-types";
import { Paper, Button, withStyles } from "@material-ui/core";
import { Field, reduxForm } from 'redux-form';
import {renderNumberField, renderTextArea, renderTextField} from "../common/InputFields";
import { requiredFields, maxFields } from "../../services/AccountInputValidation";


const styles = (theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        margin: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    }
});


const validate = (values) => {
    const errors = {};

    requiredFields(
        [
            'name',
            'tasteRating',
            'difficultyRating',
            'prepTime',
            'cookTime',
            'calories',
            'instructions',
        ],
        values,
        errors
    );

    maxFields(
        50,
        [
            'name',
            'note',
        ],
        values,
        errors
    );

    maxFields(65535, ['instructions'], values, errors);

    if (values.tasteRating < 1 || values.tasteRating > 5) {
        errors.tasteRating = 'Must be between 1 and 5!';
    }

    if (values.difficultyRating < 1 || values.difficultyRating > 5) {
        errors.difficultyRating = 'Must be between 1 and 5!';
    }

    return errors;
};


const CreateRecipeForm = (props) => {

    const { handleSubmit, pristine, submitting, valid, classes } = props;

    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                <Field
                    className={classes.textField}
                    name="name"
                    label="Name"
                    component={renderTextField}
                    fullWidth
                />

                <br/>

                <Field
                    className={classes.textField}
                    name="tasteRating"
                    label="Rating (1-5)"
                    component={renderNumberField}
                />

                <Field
                    className={classes.textField}
                    name="difficultyRating"
                    label="Difficulty Rating (1-5)"
                    component={renderNumberField}
                />

                <br/>

                <Field
                    className={classes.textField}
                    name="prepTime"
                    label="Prep Time"
                    component={renderNumberField}
                />

                <Field
                    className={classes.textField}
                    name="cookTime"
                    label="Cook Time"
                    component={renderNumberField}
                />

                <br/>

                <Field
                    className={classes.textField}
                    name="calories"
                    label="Calories Per Serving"
                    component={renderNumberField}
                />


                <br/>

                <Field
                    className={classes.textField}
                    name="instructions"
                    label="Instructions"
                    component={renderTextArea}
                    fullWidth
                />

                <br/>

                <Field
                    className={classes.textField}
                    name="note"
                    label="Personal Note"
                    component={renderTextField}
                    fullWidth
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
        </Paper>
    );

};

CreateRecipeForm.propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
};

const form = reduxForm({
    form: 'createRecipeForm',
    validate
})(CreateRecipeForm);

export default withStyles(styles)(form);
