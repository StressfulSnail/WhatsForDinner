import React from 'react';
import { Tab, Menu, MenuItem } from '@material-ui/core';
import { AccountCircleOutlined } from "@material-ui/icons";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { LANDING, ACCOUNT } from "../../UIRoutes";
import { LOGOUT } from "../../actions/accountActions";

class AccountMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    logout = () => {
        this.handleClose();
        this.props.history.push(LANDING);
        this.props.dispatchLogout();
    };

    render() {
        const { anchorEl } = this.state;

        return (
            <React.Fragment>
                <Tab
                    aria-owns={anchorEl ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    icon={<AccountCircleOutlined />}
                >
                </Tab>
                <Menu
                    id="account-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem component={Link} to={ACCOUNT}>My account</MenuItem>
                    <MenuItem onClick={this.logout}>Logout</MenuItem>
                </Menu>
            </React.Fragment>
        );
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        dispatchLogout: () => dispatch({ type: LOGOUT })
    }
};

const connected = connect(null, mapActionsToProps)(AccountMenu);

export default withRouter(connected);
