import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TermsOfService from "./TermsOfService.js";
import { FormControlLabel } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';

const styles = (theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        margin: theme.spacing.unit
    }
});

class AccountForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            middleName: "",
            email: "",
            password: "",
            confirmPassword: "",
            termsOfService: false
        };
    }


    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleCheck = () => {
        this.setState({ termsOfService: !this.state.termsOfService });
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        required
                        id="first-name"
                        label="First Name"
                        className={classes.textField}
                        value={this.state.firstName}
                        onChange={this.handleChange("firstName")}
                        margin="normal"
                        variant="filled"
                    />

                    <TextField
                        required
                        id="last-name"
                        label="Last Name"
                        className={classes.textField}
                        value={this.state.lastName}
                        onChange={this.handleChange("lastName")}
                        margin="normal"
                        variant="filled"
                    />

                    <TextField
                        id="middle-name"
                        label="Middle (Optional)"
                        className={classes.textField}
                        value={this.state.lastName}
                        onChange={this.handleChange("lastName")}
                        margin="normal"
                        variant="filled"
                    />

                    <TextField
                        required
                        id="email"
                        label="Email"
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange("email")}
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="filled"
                    />

                    <TextField
                        required
                        id="password"
                        label="Password"
                        className={classes.textField}
                        value={this.state.password}
                        onChange={this.handleChange("password")}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="filled"
                    />

                    <TextField
                        required
                        id="password"
                        label="Confirm Password"
                        className={classes.textField}
                        value={this.state.password}
                        onChange={this.handleChange("password")}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="filled"
                    />
                    <div className={classes.textField}>
                        <TermsOfService />
                    </div>

                    <FormControlLabel
                        size
                        control={
                            <Checkbox
                                color="primary"
                                checked={this.state.termsOfService}
                                onChange={this.handleCheck}
                                value="checked"
                            />
                        }
                        label="I have read and agree to the terms of service"
                    />
                </form>
            </Paper>
        );
    }
}

AccountForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountForm);