import {Checkbox, FormControlLabel, Paper, TextField} from "@material-ui/core";
import React from "react";

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
);

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
);

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
);

export {
    renderCheckbox,
    renderPasswordField,
    renderTextField
};