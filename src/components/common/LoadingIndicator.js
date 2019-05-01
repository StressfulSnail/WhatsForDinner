import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core";
import { connect } from 'react-redux';

const styles = {
    loading: {
        zIndex: 100000,
        position: 'absolute',
        backgroundColor: '#33333355',
        width: '100vw',
        height: '100vh',
    },
    loadingText: {
        marginTop: '50vh',
    }
};

const LoadingIndicator = function (props) {
    const { classes, isLoading } = props;
    return <div className={classes.loading} align="center" style={ isLoading ? {} : { display:'none' } }>
        <h2 className={classes.loadingText}>LOADING...</h2>
    </div>
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.main.isLoading,
    }
};

LoadingIndicator.propTypes = {
    classes: PropTypes.object.isRequired
};

const connected = connect(mapStateToProps, null)(LoadingIndicator);

export default withStyles(styles)(connected);