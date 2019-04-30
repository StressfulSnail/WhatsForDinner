import React from "react";
import PropTypes from "prop-types";
import {
    AppBar,
    Toolbar,
    Typography,
    withStyles,
    NoSsr,
    Tabs,
    Tab
} from "@material-ui/core";
import { Link } from 'react-router-dom';
import { AccountCircleOutlined } from '@material-ui/icons'
import AccountMenu from './AccountMenu';
import { HOME, MY_COOKBOOK, MEAL_PLANS } from "../../UIRoutes";

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
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


class UserNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.currentPath
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes, pageName } = this.props;

        return (
            <NoSsr>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            {pageName}
                        </Typography>
                        <Tabs value={this.state.value} onChange={this.handleChange}>
                            <Tab label="Home" value={HOME} component={Link} to={HOME} />
                            <Tab label="My Cookbook" value={MY_COOKBOOK} component={Link} to={MY_COOKBOOK} />
                            <Tab label="My MealPlans" value={MEAL_PLANS} component={Link} to={MEAL_PLANS} />
                            <Tab label="Public Recipes" />
                            <AccountMenu />
                        </Tabs>
                    </Toolbar>
                </AppBar>
            </NoSsr>
        );
    }
}

UserNavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    pageName: PropTypes.string.isRequired,
    currentPath: PropTypes.string.isRequired
};

export default withStyles(styles)(UserNavBar);