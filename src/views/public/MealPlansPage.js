import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { Search } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {LOADING_COMPLETE, LOADING_STARTED} from "../../actions/mainActions";

const styles = {
    grid: {
        padding: '10px',
    }
};

class MealPlansPage extends React.Component {

    componentDidMount() {
        setTimeout(() => this.props.loadingStart(),2000);
        setTimeout(() => this.props.loadingComplete(),4000);
    }

    render() {
        const { classes } = this.props;
        return <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Meal Plans
                    </Typography>
                </Toolbar>
            </AppBar>

            <Grid container spacing={24} className={classes.grid} justify="center" alignItems="center">
            <Grid item xs={12} md={10}>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            id="search"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <div align="right">
                            <Button color="primary" variant="contained">NEW MEAL PLAN</Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={10}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Start Date</TableCell>
                                <TableCell align="right">End Date</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                <TableRow key='dsa'>
                                    <TableCell component="th" scope="row">
                                        dsa
                                    </TableCell>
                                    <TableCell align="right">dsa</TableCell>
                                    <TableCell align="right">sadsa</TableCell>
                                    <TableCell align="right">
                                        <Button color="primary">VIEW</Button>
                                        <Button color="secondary">DELETE</Button>
                                    </TableCell>
                                </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            </Grid>
        </div>
    }
}

MealPlansPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        token: state.account.token,
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        loadingStart: () => dispatch({ type: LOADING_STARTED }),
        loadingComplete: () => dispatch({ type: LOADING_COMPLETE }),
    }
};

const connected = connect(mapStateToProps, mapActionsToProps)(MealPlansPage);
export default withStyles(styles)(connected);