import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import ErrorPage from "../../views/public/ErrorPage";

class PrivateRoute extends React.Component {

    render() {

        const { component: Component, isAuthenticated, ...rest } = this.props;

        return (
            <Route {...rest} render={ (props) => {
                if (isAuthenticated === true) {
                    return <Component {...props} />;
                }
                return <ErrorPage errorText={"401: Unauthorized access"}/>;
            }} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.account.isAuthenticated
    }
};

PrivateRoute.propTypes ={
    Component: PropTypes.object.isRequired
};

export default connect(mapStateToProps, null)(PrivateRoute);



