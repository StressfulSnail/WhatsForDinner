import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { LOAD_ACCOUNT } from "../../actions/accountActions";
import { Card, CardActions, CardContent, Paper, Typography, withStyles } from '@material-ui/core';
import UserNavBar from '../../components/common/UserNavBar';
import {HOME} from "../../UIRoutes";
import EditAccountDialog from "../../components/EditAccountDialog";
import ChangePasswordDialog from "../../components/ChangePasswordDialog";
import DeleteAccountDialog from "../../components/DeleteAccountDialog";

/**
 * Styles for this component
 * @type {{grow: {flexGrow: number}, root: {flexGrow: number}, menuButton: {marginRight: number, marginLeft: number}}}
 */
const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    container: {
      margin: 12
    },
    card: {
        minWidth: 275,
    },

    header: {
        fontSize: 14,
        marginTop: 12
    },
    pos: {
        marginTop: 12
    }
};

// Prevents collisions with properties
const HomeLink = (props) => <Link to="/" {...props} />;

/**
 * This class represents the Home Page: the page the user sees when they log in.
 * Currently unfinished and here to test routing.
 * @param props
 * @returns {*}
 * @constructor
 */
class AccountPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { classes, account } = this.props;

        return (

            <div className={classes.root}>
                <UserNavBar pageName={`${account.firstName}'s Account`} currentPath={HOME}/>
                <Paper className={classes.container} >
                    <Card className={classes.card} >
                        <CardContent>

                            <Typography variant="h5" component="h2">
                                Account Details:
                            </Typography>

                            <Typography className={classes.header} color="textSecondary" gutterBottom>
                                Username:
                            </Typography>

                            <Typography component="p">
                                {account.username}
                            </Typography>

                            <Typography className={classes.pos} color="textSecondary">
                                Email Address:
                            </Typography>

                            <Typography component="p">
                                {account.email}
                            </Typography>

                            <Typography className={classes.pos} color="textSecondary">
                                First Name:
                            </Typography>

                            <Typography component="p">
                                {account.firstName}
                            </Typography>

                            <Typography className={classes.pos} color="textSecondary">
                                Last Name:
                            </Typography>

                            <Typography component="p">
                                {account.lastName}
                            </Typography>

                            <Typography className={classes.pos} color="textSecondary">
                                Middle Name:
                            </Typography>

                            <Typography component="p">
                                {account.middleName}
                            </Typography>

                            <Typography className={classes.pos} color="textSecondary">
                                Subscription:
                            </Typography>

                            <Typography component="p">
                                {account.subscriptionLevel ? "free" : "paid"}
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <EditAccountDialog />
                            <ChangePasswordDialog />
                            <DeleteAccountDialog />
                        </CardActions>
                    </Card>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account.accountData
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        dispatchLoadAccount: (account) => dispatch({ type: LOAD_ACCOUNT, payload: { account } })
    }
};

AccountPage.propTypes = {
    classes: PropTypes.object.isRequired,
};


const connected = connect(mapStateToProps, mapActionsToProps)(AccountPage);

export default withStyles(styles)(connected);