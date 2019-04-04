import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import AccountForm from "../../components/AccountForm";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    input: {
        margin: theme.spacing.unit
    }
});

// Avoid properties collisions
const HomeLink = props => <Link to="/" {...props} />;

function CreateAccountPage(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Create Account!
                    </Typography>
                    <Button color="inherit" component={HomeLink}>
                        Home
                    </Button>
                </Toolbar>
            </AppBar>
            <AccountForm />
        </div>
    );
}

CreateAccountPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateAccountPage);