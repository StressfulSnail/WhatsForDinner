import { AppBar, Button, Paper, Toolbar, Typography, withStyles } from "@material-ui/core";
import React from "react";
import {Link} from "react-router-dom";
import {LANDING} from "../../UIRoutes";
import PropTypes from 'prop-types';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    button: {
        marginLeft: 10,
        marginRight: 0
    },
    link: {
        marginTop: 0,
        marginRight: 15,
        marginBottom: 10
    },
    image: {
        width: "100%",
        flexShrink: 1
    }
};

const LandingLink = (props) => <Link to={LANDING} {...props} />;

function ErrorPage(props) {

    const { classes, errorText } = props;

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    Error
                </Typography>
                <Button color="inherit" component={LandingLink}>
                    Back to Main Page
                </Button>
            </Toolbar>
            <br />
            <Paper>
                <Typography variant="h6" color="error" className={classes.grow}>
                    {errorText ? errorText : "404: Page not found"}
                </Typography>
            </Paper>
        </AppBar>
    );
}

export default withStyles(styles)(ErrorPage)

