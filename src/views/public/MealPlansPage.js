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
import mealPlanService from "../../services/mealPlanService";
import {LOAD_MEAL_PLANS} from "../../actions/mealPlanActions";
import DateFormat from "../../components/DateFormat";

const styles = {
    grid: {
        padding: '10px',
    }
};

class MealPlansPage extends React.Component {

    componentDidMount() {
        const { token, mealPlans, loadingStart, loadingComplete, loadMealPlans } = this.props;
        if (mealPlans.length < 1) {
            loadingStart();
            mealPlanService.getMealPlans(token)
                .then((mealPlans) => {
                    loadingComplete();
                    loadMealPlans(mealPlans);
                })
                .catch(console.err);
        }
    }

    render() {
        const { classes, mealPlans } = this.props;
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
                            {mealPlans.map(plan =>
                                (<TableRow key={plan.id}>
                                    <TableCell component="th" scope="row">
                                        {plan.name}
                                    </TableCell>
                                    <TableCell align="right"><DateFormat value={plan.startDate} /></TableCell>
                                    <TableCell align="right"><DateFormat value={plan.endDate} /></TableCell>
                                    <TableCell align="right">
                                        <Button color="primary">VIEW</Button>
                                        <Button color="secondary">DELETE</Button>
                                    </TableCell>
                                </TableRow>))
                            }
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
        mealPlans: state.mealPlans.plans,
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        loadingStart: () => dispatch({ type: LOADING_STARTED }),
        loadingComplete: () => dispatch({ type: LOADING_COMPLETE }),
        loadMealPlans: (plans) => dispatch({ type: LOAD_MEAL_PLANS, payload: { plans } }),
    }
};

const connected = connect(mapStateToProps, mapActionsToProps)(MealPlansPage);
export default withStyles(styles)(connected);